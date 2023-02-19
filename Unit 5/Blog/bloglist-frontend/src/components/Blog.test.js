/* eslint-disable testing-library/no-node-access */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from "./BlogForm"

describe("<Blog />", () => {
    let container
    let blog
    let user

    beforeEach(() => {
        user = {
            username: "JoeJohnson",
            name: "Johnny"
        }
    
        blog = {
            title: "Does This Work?",
            author: "This Should Show Too",
            url: "shouldnotshow.com",
            likes: 2,
            user: user
        }
    }
    )

    test('blog default renders title and author, but not url or likes', async () => {
        render(<Blog blog={blog} user={user} />)

        const listElement = await screen.findByText("Does This Work? by This Should Show Too")
        expect(listElement).toBeDefined()
        expect(listElement).not.toHaveTextContent("shouldnotshow.com")
        expect(listElement).not.toHaveTextContent("likes")
    })

    test('when view button pressed, url and likes can be seen', async () => {
        container = render(<Blog blog={blog} user={user} />).container
        const tester = userEvent.setup()

        const listElement = container.querySelector(".blogExtraContent")
        const button = screen.getByText("view")

        expect(listElement).toHaveStyle("display: none")

        await tester.click(button)
        
        const newListElement = container.querySelector(".blogExtraContent")
        expect(newListElement).toBeDefined()
        expect(newListElement).not.toHaveStyle("display: none")
    })

    test('Liking increases like count', async () => {
        const mockLike = jest.fn()
        container = render(<Blog blog={blog} user={user} incrementLikes={mockLike} />).container
        const tester = userEvent.setup()

        const button = screen.getByText("view")
        const likeButton = screen.getByText("like")

        await tester.click(button)
        await tester.click(likeButton)
        await tester.click(likeButton)
        
        expect(mockLike.mock.calls).toHaveLength(2)
    })
})

describe("<BlogForm />", () => {
    let container

    test('calls createBlog with right details', async () => {
        const mockCreate = jest.fn()
        const testUser = userEvent.setup()

        render(<BlogForm createBlog={mockCreate} />)
        const inputs = screen.getAllByRole("textbox")
        const button = screen.getByText("create")

        await testUser.type(inputs[0], "Test Title")
        await testUser.type(inputs[1], "Test Author")
        await testUser.type(inputs[2], "Test URL")
        await testUser.click(button)

        expect(mockCreate.mock.calls[0][0].title).toBe("Test Title")
    })
}
)