'use client'

import { socket } from '@/utils/socketClient'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import dayjs from 'dayjs'
import Feature from 'ol/Feature'
import Map from 'ol/Map'
import View from 'ol/View'
import Point from 'ol/geom/Point'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import { Icon, Style, Text } from 'ol/style'
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
}

const OpenLayersMap2: React.FC<Props> = ({
  center = [0, 0],
  zoom = 2
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
      const { node, date, coords } = data
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
            scale: 0.05,
            anchor: [0.5, 1]
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

      const now = dayjs()
      source.getFeatures().forEach((feature) => {
        const data: CoordsProps = feature.get('data')

        if (now.diff(dayjs(data.date), 'second') > 10) {
          feature.setStyle(
            new Style({
              image: new Icon({
                src: './point-disconnect.svg',
                scale: 0.05,
                anchor: [0.5, 1]
              })
            })
          )
        }

        if (now.diff(dayjs(data.date), 'second') > 20) {
          source.removeFeature(feature)
        }
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [])

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
