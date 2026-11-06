import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
    readonly page: Page;
    readonly newTodoInput: Locator;
    readonly todoItems: Locator;

    constructor(page: Page) {
        this.page = page;

        this.newTodoInput = page.getByRole('textbox', {
            name: 'What needs to be done?'
        });

        this.todoItems = page.locator('.todo-list').getByRole('listitem');
    }

    async goto() {
        await this.page.goto('https://demo.playwright.dev/todomvc/');
    }

    async addTodo(task: string) {
        await this.newTodoInput.fill(task);
        await this.newTodoInput.press('Enter');
    }

    getTodo(task: string) {
        return this.todoItems.filter({
            has: this.page.getByText(task, { exact: true })
        });
    }

    async completeTodo(task: string) {
        await this.getTodo(task).getByLabel('Toggle Todo').check();
    }

    async filterTodos(filter: 'All' | 'Active' | 'Completed') {
        await this.page.getByRole('link', { name: filter }).click();
    }

    async editTodo(oldTask: string, newTask: string) {
        await this.page.getByText(oldTask, { exact: true }).dblclick();

        const editInput = this.page.getByRole('textbox', { name: 'Edit' });

        await editInput.fill(newTask);
        await editInput.press('Enter');

        console.log(await this.todoItems.allInnerTexts());

        await expect(editInput).toBeHidden();
    }

    async deleteTodo(task: string) {
        const todo = this.getTodo(task);

        await todo.hover();
        await todo.getByRole('button', { name: 'Delete' }).click();
    }

    async clearCompleted() {
        await this.page.getByRole('button', {
            name: 'Clear completed'
        }).click();
    }
}