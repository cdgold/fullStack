/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: "Root Admin",
      username: "root",
      password: "password"
    } 
    cy.request('POST', "http://localhost:3003/api/users/", user)
    cy.visit('http://localhost:3003')
  })

  it('Login form is shown', function() {
    cy.contains("Log in")
    cy.contains("username")
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get("#username").type('root')
      cy.get("#password").type('password')
      cy.get("#login-button").click()
      cy.get('html').should('contain', "Root Admin logged in")
      cy.get('html').should('not.contain', "Log in")
    })

    it('fails with wrong credentials', function() {
      cy.get("#username").type('root')
      cy.get("#password").type('wagabagabobo')
      cy.get("#login-button").click()
      cy.get('html').should('not.contain', "Root Admin logged in")
      cy.get('html').should('contain', "Log in")
      cy.get('.error').should('contain', 'Wrong credentials') 
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in',function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
          name: "Root Admin",
          username: "root",
          password: "password"
        } 
        cy.request('POST', "http://localhost:3003/api/users/", user)
        cy.visit('http://localhost:3003')
    })

    it('A blog can be created', function() {
      cy.login({ username: "root", password: "password" })
      cy.contains("new blog").click()
      cy.get("#newBlogTitle").type('Title Testing')
      cy.get("#newBlogAuthor").type('Mr. Tester')
      cy.get("#newBlogUrl").type('testtest123.com')
      cy.get("#createBlogButton").click()
      cy.get('html').should('contain', "Title Testing by Mr. Tester")
      cy.get('#newBlogTitle').should('not.contain', "Title Testing")
    })
  })

  describe('After blog created', function() {
    let blog
    
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: "Root Admin",
        username: "root",
        password: "password"
      } 
      cy.request('POST', "http://localhost:3003/api/users/", user)
      blog = {
        "title": "New Blog Title",
        "author": "Mr. Writerman",
        "url": "facebook.com/abc123",
        "likes": "0",
      }
      cy.visit('http://localhost:3003')
  })

    it('A blog can be liked', function() {
      cy.login({ username: "root", password: "password"} )
      cy.contains("new blog").click()
      cy.newBlog({ blog: blog })
      cy.get(".viewButton").click()
      cy.get(".likeButton").click()
      cy.get('html').should("contain", "likes: 1")
    })

    it('A blog can be deleted by user who made it', function() {
      cy.on('window:confirm', () => true);
      cy.login({ username: "root", password: "password"} )
      cy.contains("new blog").click()
      cy.newBlog({ blog: blog })
      cy.get(".viewButton").click()
      cy.get(".removeButton").click()
      cy.get('html').should("not.contain", "by Mr. Writerman")
      cy.get('html').should("contain", "Removed blog: New Blog Title")
    })

    it('A blog can not be deleted by user who did not make it', function() {
      cy.on('window:confirm', () => true);
      const secondUser = {
        name: "Second User",
        username: "lute",
        password: "rassword"
      } 
      cy.request('POST', "http://localhost:3003/api/users/", secondUser)
      cy.login({ username: "root", password: "password"} )
      cy.newBlog({ blog: blog })
      cy.wait(500)
      cy.contains("logout").click()
      cy.login({ username: "lute", password: "rassword"} )
      cy.get(".viewButton").click()
      cy.get('.removeButton').should("have.css", "display", "none")
    })

    it('Blogs sort themselves based on number of likes', function() {
      cy.login({ username: "root", password: "password"} )
      cy.newBlog({ blog: blog })
      let secondBlog = {
        "title": "First Most Likes",
        "author": "Mrs. Writerwoman",
        "url": "google.com/123abc",
        "likes": "2",
      }
      cy.newBlog({ blog: secondBlog })
      cy.get(".blog").eq(0).should('contain', "First Most Likes")
      cy.get(".blog").eq(1).should('contain', "New Blog Title")
      let thirdBlog = {
        "title": "Second Most Likes",
        "author": "Authorperson",
        "url": "reddit.com/123abc",
        "likes": "1",
      }
      cy.newBlog({ blog: thirdBlog })
      cy.get(".blog").eq(0).should('contain', "First Most Likes")
      cy.get(".blog").eq(1).should('contain', "Second Most Likes")
      //cy.get(".viewButton").click()
      // can do a put to fix likes of first blog @ /blogIdOfFirstBlog(whatever it is)
    })


  })
})