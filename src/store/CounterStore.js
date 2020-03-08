class CounterStore{

	constructor(){

		this.state = {
			count:0
		}
	}

	increment(){
		this.state.count++
	}

	decrement(){
		this.state.count--
	}
}

export default new CounterStore()
