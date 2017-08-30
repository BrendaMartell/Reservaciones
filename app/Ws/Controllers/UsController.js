'use strict'

const Ws = use('Ws')
const User = use('App/Model/Users')
const Database = use('Database')

class UsController {

  constructor (socket, request, presence) {
    this.socket = socket
    this.request = request
    presence.track(socket, socket.currentUser.id, {
			email: socket.currentUser.email,
            id: socket.currentUser.id
		})
  }
  
}

module.exports = UsController
