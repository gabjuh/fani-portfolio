interface ISunIco {
  color?: string;
  size?: number;
}

const SunIco: React.FC<ISunIco> = ({ color = '#ffffff', size = 25 }) => {
  return (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 16C9.7944 16 8 14.2056 8 12C8 9.7944 9.7944 8 12 8C14.2056 8 16 9.7944 16 12C16 14.2056 14.2056 16 12 16Z" stroke={color}/>
      <path d="M12 3.5V5.5" stroke={color} strokeLinecap="round"/>
      <path d="M20.5 12H18.5" stroke={color} strokeLinecap="round"/>
      <path d="M5.5 12H3.5" stroke={color} strokeLinecap="round"/>
      <path d="M12 18.5V20.5" stroke={color} strokeLinecap="round"/>
      <path d="M16.5 7.5L18 6" stroke={color} strokeLinecap="round"/>
      <path d="M6 18L7.5 16.5" stroke={color} strokeLinecap="round"/>
      <path d="M6 6L7.5 7.5" stroke={color} strokeLinecap="round"/>
      <path d="M16.5 16.5L18 18" stroke={color} strokeLinecap="round"/>
    </svg>
  )
}

export default SunIco