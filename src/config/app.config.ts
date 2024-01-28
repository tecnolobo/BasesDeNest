export const vairbleEntornoConDefectos=()=>{
  return {
    envireomen:process.env.NODE_ENV||'dev', //Si no viene que se ponga dev
    mongodb:process.env.MONGODB,
    port:process.env.PORT||3002,
    defaultLimit:process.env.DEFAULT_LIMIT||7, //uppercase
  }
}