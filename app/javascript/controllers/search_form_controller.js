import {Controller} from "@hotwired/stimulus"
import {get, post} from '@rails/request.js'

// Connects to data-controller="search-form"
export default class extends Controller {
    static values = {
        current: {type: Number, default: 0},
        new: {type: Number, default: 0},
        increasing: {type: Boolean, default: true},
        // term: {type: String, default: ''}
    }

    connect() {
        // console.log('searchForm is connected')
    }

    search(e) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            this.search_data(e.target.value)
            this.filter_data(e.target.value)
        }, 500)
    }

    search_data(query) {
        try {
            post(`/articles/search`, {
                body: JSON.stringify({query: query}),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/vnd.turbo-stream.html',
                },
            })
        } catch (e) {
            console.log(e)
        }
    }

    filter_data(query) {
        this.newValue = query.length;
        if (this.newValue >= this.currentValue ) {
            this.currentValue = this.newValue
            try {
                post(`/searches/create`, {
                    body: JSON.stringify({query: query}),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'text/vnd.turbo-stream.html',
                    },
                })
            } catch (e) {
                console.log(e)
            }
        } else if (this.newValue < this.currentValue) {
            this.currentValue = this.newValue
            this.increasingValue = false
        }
    };
}

/*
if the word decreased without any increase don't send
once there is increase start sending
----
curr=0; new = 0; inc = true; dec = false
new = query.length
new > curr && inc?
    curr = new
    send it to backend
new < curr?
    curr = new
    inc = false
new == curr && !inc
    send it to backend
----
Send only if it decrease or after 5 seconds


current = 5 => send
increase = 1, decrease = 0
current = 6 => send
decrease = 1
current = 3
*/
