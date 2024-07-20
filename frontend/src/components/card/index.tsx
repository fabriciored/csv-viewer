interface CardProps {
    name: string
    city: string
    country: string
    favoriteSport: string
}

function Card(props: CardProps) {
  return (
    <div className='
    p-6 
    border border-slate-900
    rounded-xl
    '>
        <h5>Name: {props.name}</h5>
        <h5>City: {props.city}</h5>
        <h5>Country: {props.country}</h5>
        <h5>Favorite Sport: {props.favoriteSport}</h5>
    </div>
  )
}

export default Card