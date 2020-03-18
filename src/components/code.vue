axios({
        method: 'post',
        url: url,
        data : {email : this.email, password: this.password}
      })