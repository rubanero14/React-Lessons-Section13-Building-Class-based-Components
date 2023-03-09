import { Component } from "react";
import User from "./User";

import classes from "./Users.module.css";

class Users extends Component {
  // In class based components, states are initialized, defined and updated using constructor method
  constructor() {
    super(); // super method is called to invoke the class's constructor which this component inherits and initializes its attributes here

    // states are created inside JS object where keys a states declared, and values are initial defined state
    this.state = {
      showUsers: true,
    };
  }

  toggleUsersHandler() {
    // In class based components, updating states are be done using .setState() method, where args are JS object and states updated within
    this.setState((currState) => {
      return {
        showUsers: !currState.showUsers,
      };
    });
  }

  // Class based Lifecycles
  // This lifecycle is called when component is rendered to the DOM for first time and thats it, equivalent to useEffect(someCode, []);
  componentDidMount() {}

  // This lifecycle is called when component is updated, equivalent to useEffect(someCode, [someDependencies]);
  componentDidUpdate() {
    if (this.props.users.length === 0) {
      throw new Error("No users provided!");
    }
  }

  // This lifecycle is called before component is removed from the DOM, equivalent to useEffect(() => { return {...} }, []), or cleanup function
  componentWillUnmount() {}

  render() {
    // Data are managed within render method
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );
    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? "Hide" : "Show"} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
