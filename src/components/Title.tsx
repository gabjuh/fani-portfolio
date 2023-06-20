import React from 'react'

interface ITitle {
  title?: string;
  className?: string;
}

const Title: React.FC<ITitle> = ({ title, className }) => {
  return (
    <div
      className={`${className} text-2xl font-semibold mt-5 mb-8`}
    >
      {title}
    </div>
  )
}

export default Title