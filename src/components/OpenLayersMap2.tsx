'use client'

import { socket } from '@/utils/socketClient'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import dayjs from 'dayjs'
import Feature from 'ol/Feature'
import Map from 'ol/Map'
import View from 'ol/View'
import { LineString } from 'ol/geom'
import Point from 'ol/geom/Point'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import { Fill, Icon, Stroke, Style, Text } from 'ol/style'
import React, { useEffect, useRef, useState } from 'react'

export interface CoordsProps {
  node: string
  date: Date
  coords: {
    latitude: number
    longitude: number
    accuracy?: number
  }
}

interface Props {
  center?: [number, number]
  zoom?: number
  routeCoords?: Array<{ latitude: number; longitude: number }>
}

const OpenLayersMap2: React.FC<Props> = ({
  center = [0, 0],
  zoom = 2,
  routeCoords = []
}: Props) => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<Map | null>(null)
  const vectorLayerInstance = useRef<VectorLayer<VectorSource> | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Initialize the map when the component mounts
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    const vectorSource = new VectorSource()
    const vectorLayer = new VectorLayer({ source: vectorSource })

    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: new View({
        center: fromLonLat(center),
        zoom: zoom
      })
    })

    mapInstance.current = map
    vectorLayerInstance.current = vectorLayer

    return () => {
      mapInstance.current = null
      vectorLayerInstance.current = null
    }
  }, [])

  // Get coords from websocket and update the map
  useEffect(() => {
    socket.on('message', (data: CoordsProps) => {
      const { node, coords } = data
      const { latitude, longitude } = coords

      if (!mapInstance.current || !vectorLayerInstance.current) return

      const source = vectorLayerInstance!.current.getSource()
      if (!source) return

      const feature = new Feature({
        geometry: new Point(fromLonLat([longitude, latitude]))
      })
      feature.setStyle(
        new Style({
          image: new Icon({
            src: './point.svg',
            scale: 0.06,
            anchor: [0.5, 1]
          }),
          text: new Text({
            text: `${data.node}`,
            offsetY: -55,
            fill: new Fill({
              color: [255, 255, 255, 1]
            }),
            backgroundFill: new Fill({
              color: [7, 82, 159, 1]
            }),
            padding: [5, 5, 5, 5]
          })
        })
      )

      if (source.getFeatureById(node)) {
        const existingFeature = source.getFeatureById(node)
        existingFeature?.setGeometry(feature.getGeometry())
      } else {
        feature.setId(node)
        feature.set('data', data)
        source.addFeature(feature)
      }
    })
    return () => {
      socket.off('message')
    }
  }, [])

  // Handle fullscreen change
  useEffect(() => {
    const handler = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  // Delete features that haven't been updated for more than 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!mapInstance.current || !vectorLayerInstance.current) return

      const source = vectorLayerInstance!.current.getSource()
      if (!source) return

      if (source.getFeatures().length === 0) return

      const now = dayjs()
      source.getFeatures().forEach((feature) => {
        const data: CoordsProps = feature.get('data')

        if (!data) return

        if (now.diff(dayjs(data!.date), 'second') > 10) {
          feature.setStyle(
            new Style({
              image: new Icon({
                src: './point-disconnect.svg',
                scale: 0.06,
                anchor: [0.5, 1]
              }),
              text: new Text({
                text: `${data.node} Disconnected`,
                offsetY: -55,
                fill: new Fill({
                  color: [255, 255, 255, 1]
                }),
                backgroundFill: new Fill({
                  color: [176, 0, 32, 1]
                }),
                padding: [5, 5, 5, 5]
              })
            })
          )
        }

        if (now.diff(dayjs(data!.date), 'second') > 20) {
          source.removeFeature(feature)
        }
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Draw route from OSRM and squares with index
  useEffect(() => {
    if (!mapInstance.current || !vectorLayerInstance.current) return
    const source = vectorLayerInstance.current.getSource()
    if (!source) return

    // Remove previous route features
    source.getFeatures().forEach((f) => {
      if (f.get('type') === 'route' || f.get('type') === 'route-point') {
        source.removeFeature(f)
      }
    })

    if (routeCoords.length < 2) return

    const coordsStr = routeCoords
      .map((p) => `${p.longitude},${p.latitude}`)
      .join(';')
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${coordsStr}?overview=full&geometries=geojson`

    fetch(osrmUrl)
      .then((res) => res.json())
      .then((data) => {
        if (!data.routes || !data.routes[0]) return
        const routeGeo = data.routes[0].geometry.coordinates
        const line = new Feature({
          geometry: new LineString(routeGeo.map((c: any) => fromLonLat(c))),
          type: 'route'
        })
        line.setStyle(
          new Style({
            stroke: new Stroke({ color: '#07529F', width: 4 })
          })
        )
        source.addFeature(line)

        routeCoords.forEach((p, idx) => {
          const feature = new Feature({
            geometry: new Point(fromLonLat([p.longitude, p.latitude])),
            type: 'route-point'
          })
          feature.setStyle(
            new Style({
              image: new Icon({
                src: './square.svg',
                scale: 0.06,
                anchor: [0.5, 1]
              }),
              text: new Text({
                text: `${idx}`,
                offsetY: -20,
                fill: new Fill({ color: '#fff' }),
                padding: [4, 4, 4, 4]
              })
            })
          )

          source.addFeature(feature)
        })
      })
      .catch(() => {})
  }, [routeCoords])

  return (
    <div
      ref={mapRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 99
        }}
      >
        <Button
          onClick={async () => {
            if (!mapRef.current) return

            !document.fullscreenElement
              ? await mapRef.current.requestFullscreen()
              : await document.exitFullscreen()
          }}
          icon={
            isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />
          }
        />
      </div>
    </div>
  )
}

export default OpenLayersMap2
