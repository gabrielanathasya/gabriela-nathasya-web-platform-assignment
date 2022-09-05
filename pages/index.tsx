import { useRouter } from "next/router"
import { useEffect } from "react"
import { useQuery, gql } from "@apollo/client"
import ContactList from "features/contact-list"

const GET_CONTACT_LIST = gql`
  query GetContactList(
    $distinct_on: [contact_select_column!]
    $limit: Int
    $offset: Int
    $order_by: [contact_order_by!]
    $where: contact_bool_exp
  ) {
    contact(
      distinct_on: $distinct_on
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) {
      created_at
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`

const LAUNCHES = gql`
  query Launches {
    launches {
      mission_name
      mission_id
      rocket {
        rocket_name
        rocket {
          company
          name
          mass {
            kg
          }
        }
      }
      launch_site {
        site_name
      }
      launch_date_local
    }
  }
`

const Home = () => {
  const router = useRouter()
  const { loading, error, data } = useQuery(GET_CONTACT_LIST)

  // override to profile
  // useEffect(() => {
  //   const userId = localStorage.getItem("userId")

  //   if (userId) {
  //     // view detail
  //     router.push(`/profile/${userId}`)
  //   } else {
  //     // create
  //     router.push("/profile")
  //   }
  // }, [router])

  // if (loading) return "Loading..."
  // if (error) return `ERROR! ${error.message}`

  // return <div>{JSON.stringify(data)}</div>
  return (
    <div>
      <ContactList />
    </div>
  )
}

export default Home
