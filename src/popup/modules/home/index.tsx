const HomePage: React.FC = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <div className='flex h-[100px] w-[100px] animate-[spin_3s_linear_infinite] items-center justify-center'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png'
          alt='reactjs'
          className='object-contain'
        />
      </div>

      <div className='mt-[16px] text-center text-[16px] font-medium'>
        Simple Chrome Extension with TypeScript
      </div>
    </div>
  )
}

export default HomePage
