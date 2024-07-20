import Card from '../../card'
import { User } from '../../../entities/user'

interface DatagridProps {
  data: Array<User>
}

function Datagrid(props: DatagridProps) {
  return (
    <div className='grid grid-cols-4 gap-6 w-full'>
      {props.data.map((user => {
        return (
          <Card
            key={user.id}
            name={user.name}
            city={user.city}
            country={user.country}
            favoriteSport={user.favoriteSport}
          />
        )
      }) 
    )}

    </div>
  )
}

export default Datagrid