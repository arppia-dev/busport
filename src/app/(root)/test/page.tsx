'use client'

import { useEffect, useState } from 'react'
import { socket } from '@/utils/socketClient'

export interface CoordsProps {
  node: string
  date: Date
  coords: {
    latitude: number
    longitude: number
    accuracy?: number
  }
}

interface LatLng {
  lat: number
  lng: number
}

interface BusState {
  name: string
  start: LatLng
  end: LatLng
  path: LatLng[]
  pathIndex: number
}

const INTERMEDIATE_POINTS = 100

const generatePath = (
  start: LatLng,
  end: LatLng,
  intermediateCount: number
): LatLng[] => {
  const points: LatLng[] = [start]
  const jitter = 0.001

  for (let i = 1; i <= intermediateCount; i += 1) {
    const t = i / (intermediateCount + 1)
    const lat =
      start.lat + (end.lat - start.lat) * t + (Math.random() - 0.5) * jitter
    const lng =
      start.lng + (end.lng - start.lng) * t + (Math.random() - 0.5) * jitter

    points.push({ lat, lng })
  }

  points.push(end)
  return points
}

export default function TestPage() {
  const [isEmitting, setIsEmitting] = useState(false)
  const [buses, setBuses] = useState<BusState[]>(() => {
    const baseBuses = [
      {
        name: 'Bus-501',
        start: { lat: 8.9824, lng: -79.5199 },
        end: { lat: 9.02, lng: -79.48 }
      },
      {
        name: 'Bus-502',
        start: { lat: 9.05, lng: -79.5 },
        end: { lat: 9.0, lng: -79.65 }
      },
      {
        name: 'Bus-503',
        start: { lat: 8.95, lng: -79.45 },
        end: { lat: 8.9, lng: -79.55 }
      },
      {
        name: 'Bus-504',
        start: { lat: 9.0, lng: -79.65 },
        end: { lat: 8.96, lng: -79.6 }
      }
    ]

    return baseBuses.map((bus) => ({
      ...bus,
      path: generatePath(bus.start, bus.end, INTERMEDIATE_POINTS),
      pathIndex: 0
    }))
  })

  useEffect(() => {
    if (!isEmitting) return

    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => {
          const nextIndex =
            bus.pathIndex < bus.path.length - 1
              ? bus.pathIndex + 1
              : bus.pathIndex
          const currentPoint = bus.path[nextIndex]

          const busData: CoordsProps = {
            node: bus.name,
            date: new Date(),
            coords: {
              latitude: currentPoint.lat,
              longitude: currentPoint.lng,
              accuracy: Math.floor(Math.random() * 20) + 5
            }
          }

          socket.emit('message', busData)
          console.log('Enviado:', busData)

          return {
            ...bus,
            pathIndex: nextIndex
          }
        })
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [isEmitting])

  const handleStart = () => {
    setIsEmitting(true)
  }

  const handleStop = () => {
    setIsEmitting(false)
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Test Page - Emisor de Coordenadas</h1>
      <p>Buses activos: {buses.length}</p>
      <p>Estado: {isEmitting ? '✅ Emitiendo' : '⏸️ Detenido'}</p>

      <div style={{ marginTop: '20px', gap: '10px', display: 'flex' }}>
        <button
          onClick={handleStart}
          disabled={isEmitting}
          style={{
            padding: '10px 20px',
            cursor: isEmitting ? 'not-allowed' : 'pointer',
            opacity: isEmitting ? 0.6 : 1
          }}
        >
          Iniciar Emisión
        </button>
        <button
          onClick={handleStop}
          disabled={!isEmitting}
          style={{
            padding: '10px 20px',
            cursor: !isEmitting ? 'not-allowed' : 'pointer',
            opacity: !isEmitting ? 0.6 : 1
          }}
        >
          Detener Emisión
        </button>
      </div>

      <div
        style={{
          marginTop: '30px',
          padding: '15px',
          backgroundColor: '#f0f0f0',
          borderRadius: '5px'
        }}
      >
        <h3>Posiciones Actuales de los Buses:</h3>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {buses.map((bus, idx) => {
            const currentPoint = bus.path[bus.pathIndex]
            return (
              <div
                key={idx}
                style={{
                  padding: '12px',
                  margin: '8px 0',
                  backgroundColor: '#fff',
                  borderLeft: '4px solid #2196F3',
                  borderRadius: '4px'
                }}
              >
                <strong>{bus.name}</strong> - Lat: {currentPoint.lat.toFixed(6)}
                , Lng: {currentPoint.lng.toFixed(6)}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
