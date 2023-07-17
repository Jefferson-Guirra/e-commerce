export const handleTime = (time: number) => {
  const timeStamp = new Date(time)
  const timeFormat = timeStamp.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
  return timeFormat
}
