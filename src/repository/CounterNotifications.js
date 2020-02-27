class CounterNotifications{

	constructor(){
		this.state = {
			count:0	
		}
	}

	increment(){
		this.state.count++
	}

	decrement(){
		this.state.decrement--
	}

}

export default new CounterNotifications()