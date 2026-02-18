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
    width: '240px',
    background: '#9E9E9E',
    borderRadius: '16px',
    padding: '15px 12px',
    position: 'relative',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
  }

  // Estilo de los retrovisores
  const mirrorStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50px',
    width: '25px',
    height: '12px',
    background: '#333',
    borderRadius: '4px'
  }

  // Estilo de la cabina del conductor
  const cabinStyle: React.CSSProperties = {
    background: '#6B6B6B',
    borderRadius: '8px 8px 0 0',
    padding: '12px 8px',
    marginBottom: '8px',
    position: 'relative'
  }

  // Estilo del parabrisas
  const windshieldStyle: React.CSSProperties = {
    background: '#B0BEC5',
    height: '25px',
    borderRadius: '6px',
    marginBottom: '8px',
    border: '2px solid #78909C'
  }

  // Estilo del área de asientos
  const seatsAreaStyle: React.CSSProperties = {
    background: colorBgContainer,
    borderRadius: '5px',
    padding: '12px 8px',
    minHeight: '350px'
  }

  // Estilo de cada asiento
  const seatStyle = (isReserved: boolean): React.CSSProperties => ({
    width: '38px',
    height: '38px',
    background: isReserved ? '#52c41a' : '#1976D2',
    border: `2px solid ${isReserved ? '#237804' : '#000'}`,
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '11px',
    fontWeight: 'bold'
  })

  // Estilo del asiento del conductor
  const driverSeatStyle: React.CSSProperties = {
    width: '38px',
    height: '38px',
    background: '#FFD54F',
    border: '2px solid #000',
    borderRadius: '6px',
    marginRight: 'auto'
  }

  // Estilo del volante
  const steeringWheelStyle: React.CSSProperties = {
    width: '25px',
    height: '25px',
    border: '2px solid #616161',
    borderRadius: '50%',
    background: '#9E9E9E',
    position: 'absolute',
    top: '50%',
    left: '16px',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const steeringWheelCenterStyle: React.CSSProperties = {
    width: '8px',
    height: '8px',
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
          <div style={{ position: 'relative', minHeight: '45px' }}>
            <div style={driverSeatStyle} />
            <div style={steeringWheelStyle}>
              <div style={steeringWheelCenterStyle} />
            </div>
          </div>
        </div>

        {/* Área de asientos */}
        <div style={seatsAreaStyle}>
          <Flex vertical gap={8}>
            {Array.from({ length: rows }).map((_, rowIndex) => {
              const startIdx = rowIndex * 4
              return (
                <Flex key={rowIndex} gap={8} justify="space-between">
                  {/* Lado izquierdo - 2 asientos */}
                  <Flex gap={6}>
                    {startIdx < capacity && (
                      <div style={seatStyle(seats[startIdx])}>
                        {startIdx + 1}
                      </div>
                    )}
                    {startIdx + 1 < capacity && (
                      <div style={seatStyle(seats[startIdx + 1])}>
                        {startIdx + 2}
                      </div>
                    )}
                  </Flex>

                  {/* Lado derecho - 2 asientos */}
                  <Flex gap={6}>
                    {startIdx + 2 < capacity && (
                      <div style={seatStyle(seats[startIdx + 2])}>
                        {startIdx + 3}
                      </div>
                    )}
                    {startIdx + 3 < capacity && (
                      <div style={seatStyle(seats[startIdx + 3])}>
                        {startIdx + 4}
                      </div>
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
