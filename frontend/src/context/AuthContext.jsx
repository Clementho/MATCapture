import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    case 'UPDATE':
      return { 
        ...state, 
        user: { ...state.user,  username: action.payload, hasChanged: state.user.hasChanged + 1, } 
      };
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  console.log(localStorage.getItem("user"))
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch({type: 'LOGIN', payload: user})
    }
  }, [])
  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{...state, dispatch, state}}>
      { children }
    </AuthContext.Provider>
  )
}