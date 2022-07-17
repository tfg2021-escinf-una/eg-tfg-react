import { Button } from "@mui/material";
import { identityService } from "apps/tfg-frontend/src/services";
import { doApiCall } from "apps/tfg-frontend/src/utils";
import { useState } from "react";
import { withAuthentication } from "../../components/hoc";

const Home = () => {

  const [ roles, setRoles ] = useState<any>([])
  const onClickRoleButton = async() => {
    const roles = await doApiCall(identityService.getRoles, {}, 'roles')
    setRoles(roles.data)
  }

  return (
    <div>
      <Button variant="outlined"
              onClick={onClickRoleButton}>
        CallApiRoles
      </Button>
      <div>
        {
          roles.map((it : any, index : number) => (
            <p key={index}>{it.name}</p>
          ))
        }
      </div>
    </div>
  );
}

export const HomePage = withAuthentication(Home)
