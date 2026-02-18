import { Flex, theme } from 'antd'

interface BusLayoutProps {
  capacity: number
  reserved?: number
}

const BusLayout: React.FC<BusLayoutProps> = ({ capacity, reserved = 0 }) => {
  const {
    token: { colorPrimary, colorBgContainer }
  } = theme.useToken()

  // Estilo del contenedor del bus
  const busStyle: React.CSSProperties = {
    width: '300px',
    background: '#9E9E9E',
    borderRadius: '20px',
    padding: '20px 15px',
    position: 'relative',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
  }

  // Estilo de los retrovisores
  const mirrorStyle: React.CSSProperties = {
    position: 'absolute',
    top: '60px',
    width: '30px',
    height: '15px',
    background: '#333',
    borderRadius: '5px'
  }

  // Estilo de la cabina del conductor
  const cabinStyle: React.CSSProperties = {
    background: '#6B6B6B',
    borderRadius: '10px 10px 0 0',
    padding: '15px 10px',
    marginBottom: '10px',
    position: 'relative'
  }

  // Estilo del parabrisas
  const windshieldStyle: React.CSSProperties = {
    background: '#B0BEC5',
    height: '30px',
    borderRadius: '8px',
    marginBottom: '10px',
    border: '2px solid #78909C'
  }

  // Estilo del área de asientos
  const seatsAreaStyle: React.CSSProperties = {
    background: colorBgContainer,
    borderRadius: '5px',
    padding: '15px 10px',
    minHeight: '400px'
  }

  // Estilo de cada asiento
  const seatStyle = (isReserved: boolean): React.CSSProperties => ({
    width: '45px',
    height: '45px',
    background: isReserved ? colorPrimary : '#1976D2',
    border: `3px solid ${isReserved ? '#003D82' : '#000'}`,
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s'
  })

  // Estilo del asiento del conductor
  const driverSeatStyle: React.CSSProperties = {
    width: '45px',
    height: '45px',
    background: '#FFD54F',
    border: '3px solid #000',
    borderRadius: '8px',
    marginRight: 'auto'
  }

  // Estilo del volante
  const steeringWheelStyle: React.CSSProperties = {
    width: '30px',
    height: '30px',
    border: '3px solid #616161',
    borderRadius: '50%',
    background: '#9E9E9E',
    position: 'absolute',
    top: '50%',
    left: '20px',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const steeringWheelCenterStyle: React.CSSProperties = {
    width: '10px',
    height: '10px',
    background: '#FFD54F',
    borderRadius: '50%'
  }

  // Calcular distribución de asientos
  // Patrón típico de bus: 2 asientos izquierda, pasillo, 2 asientos derecha
  const rows = Math.ceil(capacity / 4)
  const seats: boolean[] = []

  for (let i = 0; i < capacity; i++) {
    seats.push(i < reserved)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div style={busStyle}>
        {/* Retrovisor izquierdo */}
        <div style={{ ...mirrorStyle, left: '-25px' }} />

        {/* Retrovisor derecho */}
        <div style={{ ...mirrorStyle, right: '-25px' }} />

        {/* Cabina del conductor */}
        <div style={cabinStyle}>
          {/* Parabrisas */}

          {/* Área del conductor */}
          <div style={{ position: 'relative', minHeight: '50px' }}>
            <div style={driverSeatStyle} />
            <div style={steeringWheelStyle}>
              <div style={steeringWheelCenterStyle} />
            </div>
          </div>
        </div>

        {/* Área de asientos */}
        <div style={seatsAreaStyle}>
          <Flex vertical gap={10}>
            {Array.from({ length: rows }).map((_, rowIndex) => {
              const startIdx = rowIndex * 4
              return (
                <Flex key={rowIndex} gap={10} justify="space-between">
                  {/* Lado izquierdo - 2 asientos */}
                  <Flex gap={8}>
                    {startIdx < capacity && (
                      <div style={seatStyle(seats[startIdx])} />
                    )}
                    {startIdx + 1 < capacity && (
                      <div style={seatStyle(seats[startIdx + 1])} />
                    )}
                  </Flex>

                  {/* Lado derecho - 2 asientos */}
                  <Flex gap={8}>
                    {startIdx + 2 < capacity && (
                      <div style={seatStyle(seats[startIdx + 2])} />
                    )}
                    {startIdx + 3 < capacity && (
                      <div style={seatStyle(seats[startIdx + 3])} />
                    )}
                  </Flex>
                </Flex>
              )
            })}
          </Flex>
        </div>
      </div>
    </div>
  )
}

export default BusLayout
