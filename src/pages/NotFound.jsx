import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  }
  return (
    <div className="screen-centered" >
      <img src="/imgs/notfound.png" alt="" />
      <Button type="button" onClick={goHome} variant="contained" color="secondary" size="large" sx={{mt: 4}}>
        Go Home Page
      </Button>
    </div>
  )
}

export default NotFound