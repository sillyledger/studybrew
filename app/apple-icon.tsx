import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: 'flex',
          position: 'relative',
          borderRadius: 30,
          overflow: 'hidden',
          background: '#5DCAA5',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 93,
            top: 0,
            width: 87,
            height: 180,
            background: '#7CACDD',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 93,
            top: 0,
            width: 24,
            height: 180,
            background: '#042C53',
            opacity: 0.3,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 129,
            top: 0,
            width: 30,
            height: 78,
            background: '#F0997B',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 129,
            top: 78,
            width: 0,
            height: 0,
            borderLeft: '15px solid transparent',
            borderRight: '15px solid transparent',
            borderTop: '21px solid #F0997B',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 96,
            width: 93,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            fontWeight: 700,
            color: '#F4F1E8',
            opacity: 0.4,
            fontFamily: 'sans-serif',
          }}
        >
          SB
        </div>
      </div>
    ),
    { ...size }
  )
}
