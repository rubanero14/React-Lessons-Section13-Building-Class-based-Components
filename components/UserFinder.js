import { Fragment, Component } from "react";

import Users from "./Users";

import styles from "./UserFinder.module.css";
import UsersContext from "../store/users-context";
import ErrorBoundary from "./ErrorBoundary";

class UserFinder extends Component {
  // To use context in this class component, React has contextType method where you can assign any context to it as variable and to access its data, simply
  // type this.context.["context-name"] to access its data
  static contextType = UsersContext;
  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  // Lifecycle fires when component renders to the DOM for the first time and only once
  componentDidMount() {
    // Mock dummy http request...
    this.setState({ filteredUsers: this.context.users });
  }

  // Lifecycle hooks fires when component updates due to state or props changes, takes in 2 args, previous props and state snapshot
  componentDidUpdate(prevProps, prevState) {
    // To avoid infinite loop for this lifecycle executes as side-effect, the code block below needs a gated condition to execute
    // Comparing previous state for searchTerm snapshot with current searchTerm state, if changes then execute the line below.
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        ),
      });
    }
  }

  render() {
    return (
      <Fragment>
        {/* For class based components, context can be used using [comp-name].Consumer component to use the store */}
        {/*
          <UsersContext.Consumer>
            <div className={styles.finder}>
              <input
                type="search"
                onChange={this.searchChangeHandler.bind(this)}
              />
            </div>
            <Users users={this.state.filteredUsers} />
          </UsersContext.Consumer>
        */}
        <div className={styles.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={styles.finder}>
//         <input type="search" onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;
