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

interface BusData {
  name: string
  lat: number
  lng: number
}

export default function TestPage() {
  const [isEmitting, setIsEmitting] = useState(false)
  const [buses, setBuses] = useState<BusData[]>([
    { name: 'Bus-501', lat: 8.9824, lng: -79.5199 },
    { name: 'Bus-502', lat: 9.05, lng: -79.5 },
    { name: 'Bus-503', lat: 8.95, lng: -79.45 },
    { name: 'Bus-504', lat: 9.0, lng: -79.65 },
    { name: 'Bus-505', lat: 8.98, lng: -79.52 },
    { name: 'Bus-506', lat: 9.02, lng: -79.48 },
    { name: 'Bus-507', lat: 8.97, lng: -79.55 },
    { name: 'Bus-508', lat: 9.03, lng: -79.5 },
    { name: 'Bus-509', lat: 8.96, lng: -79.6 },
    { name: 'Bus-510', lat: 9.01, lng: -79.46 }
  ])

  useEffect(() => {
    if (!isEmitting) return

    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => {
          // Mover cada bus un poco aleatoriamente
          const newBus = {
            ...bus,
            lat: bus.lat + (Math.random() * 0.005 - 0.0025),
            lng: bus.lng + (Math.random() * 0.005 - 0.0025)
          }

          // Emitir datos del bus
          const busData: CoordsProps = {
            node: newBus.name,
            date: new Date(),
            coords: {
              latitude: newBus.lat,
              longitude: newBus.lng,
              accuracy: Math.floor(Math.random() * 20) + 5
            }
          }

          socket.emit('message', busData)
          console.log('Enviado:', busData)

          return newBus
        })
      )
    }, 500)

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
          {buses.map((bus, idx) => (
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
              <strong>{bus.name}</strong> - Lat: {bus.lat.toFixed(6)}, Lng:{' '}
              {bus.lng.toFixed(6)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
