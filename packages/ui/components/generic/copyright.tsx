export const Copyright = () => {
  return (
    <>
      &copy; {new Date().getFullYear()} {process.env.COMPANY_NAME}. All rights
      reserved.
    </>
  )
}
