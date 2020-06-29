
'use strict';

// tag::vars[]
const React = require('react'); // <1>
const ReactDOM = require('react-dom'); // <2>
const client = require('./client'); // <3>

class App extends React.Component { // <1>

	constructor(props) {
		super(props);
		this.state = {employees: []};
	}

	componentDidMount() { // <2>
		client({method: 'GET', path: '/postgressApp/employeeList'}).done(response => {
            this.setState({employees: response.entity._embedded.employees});
            
		});
	}

	render() { // <3>
		return (
			<EmployeeList employees={this.state.employees}/>
		)
	}
}

// tag::employee-list[]
class EmployeeList extends React.Component{
	render() {
		const employees = this.props.employees.map(employee =>
			<Employee key={employee._links.self.href} employee={employee}/>
		);
		return (
			<table>
				<tbody>
					<tr>
                        <th>ID</th>
						<th>Name</th>
						<th>Address</th>
						<th>Email</th>
					</tr>
					{employees}
				</tbody>
			</table>
		)
	}
}
// end::employee-li

class Employee extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.employee.employeeId}</td>
				<td>{this.props.employee.employeeName}</td>
				<td>{this.props.employee.employeeAddress}</td>
                <td>{this.props.employee.employeeEmail}</td>
			</tr>
		)
	}
}

// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]