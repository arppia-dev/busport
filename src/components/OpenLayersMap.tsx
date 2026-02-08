"use client"

import Feature from "ol/Feature"
import Map from "ol/Map"
import View from "ol/View"
import Point from "ol/geom/Point"
import TileLayer from "ol/layer/Tile"
import VectorLayer from "ol/layer/Vector"
import "ol/ol.css"
import { fromLonLat } from "ol/proj"
import OSM from "ol/source/OSM"
import VectorSource from "ol/source/Vector"
import { Icon, Style } from "ol/style"
import React, { useEffect, useRef, useState } from "react"
import { Button } from "antd"
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons"

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
  coords: CoordsProps[] | null
  center?: [number, number]
  zoom?: number
}

const OpenLayersMap: React.FC<Props> = ({ coords, center, zoom }: Props) => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<Map | null>(null)
  const pointFeature = useRef<Feature>(new Feature())
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (!mapRef.current) return

    const view = new View({
      center: center ? center : [0, 0],
      zoom: zoom ?? 2
    })

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [pointFeature.current]
      })
    })

    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: view
    })

    mapInstance.current = map

    return () => {
      map.setTarget(undefined)
    }
  }, [center, zoom])

  useEffect(() => {
    const handler = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener("fullscreenchange", handler)
    return () => document.removeEventListener("fullscreenchange", handler)
  }, [])

  useEffect(() => {
    if (!coords || !mapInstance.current) return

    if (!coords.length) return

    const positions = coords.map((coord) =>
      fromLonLat([coord.coords.longitude, coord.coords.latitude])
    )

    const features = positions.map((pos) => {
      const feature = new Feature(new Point(pos))
      feature.setStyle(
        new Style({
          image: new Icon({
            src: "./point.svg",
            scale: 0.05,
            anchor: [0.1, 0.1]
          })
        })
      )
      return feature
    })

    const map = mapInstance.current
    const vectorLayer = map
      .getLayers()
      .getArray()
      .find((layer) => layer instanceof VectorLayer) as VectorLayer

    const vectorSource = vectorLayer.getSource() as VectorSource
    vectorSource.clear()
    vectorSource.addFeatures(features)

    map.getView().setCenter(positions[0])
  }, [coords])

  return (
    <div
      ref={mapRef}
      style={{
        position: "relative",
        width: "100%",
        height: "650px"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 1000
        }}
      >
        <Button
          size="large"
          onClick={async () => {
            if (!mapRef.current) return
            try {
              if (!document.fullscreenElement) {
                await mapRef.current.requestFullscreen()
              } else {
                await document.exitFullscreen()
              }
            } catch (e) {
              // eslint-disable-next-line no-console
              console.error("Fullscreen error", e)
            }
          }}
          icon={
            isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />
          }
        />
      </div>
    </div>
  )
}

export default OpenLayersMap
