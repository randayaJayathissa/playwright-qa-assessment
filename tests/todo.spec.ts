import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todo.page';

test.describe('TodoMVC Application', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('should add three todos', async () => {
    await todoPage.addTodo('Learn Playwright');
    await todoPage.addTodo('Practice TypeScript');
    await todoPage.addTodo('Build QA Tests');

    await expect(todoPage.todoItems).toHaveCount(3);
  });

  test('should complete a todo and update remaining count', async () => {
    await todoPage.addTodo('Learn Playwright');
    await todoPage.addTodo('Practice TypeScript');
    await todoPage.addTodo('Build QA Tests');

    await todoPage.completeTodo('Learn Playwright');

    await expect(
      todoPage.page.getByText('2 items left', { exact: true })
    ).toBeVisible();
  });

  test('should filter active and completed todos', async () => {
    await todoPage.addTodo('Learn Playwright');
    await todoPage.addTodo('Practice TypeScript');
    await todoPage.addTodo('Build QA Tests');

    await todoPage.completeTodo('Learn Playwright');

    // Active filter
    await todoPage.filterTodos('Active');

    await expect(todoPage.getTodo('Learn Playwright')).toBeHidden();
    await expect(todoPage.getTodo('Practice TypeScript')).toBeVisible();
    await expect(todoPage.getTodo('Build QA Tests')).toBeVisible();

    // Completed filter
    await todoPage.filterTodos('Completed');

    await expect(todoPage.getTodo('Learn Playwright')).toBeVisible();
    await expect(todoPage.getTodo('Practice TypeScript')).toBeHidden();
    await expect(todoPage.getTodo('Build QA Tests')).toBeHidden();
  });

  test('should edit an existing todo', async () => {
    await todoPage.addTodo('Practice Typescript');

    await todoPage.editTodo(
      'Practice Typescript',
      'Practice TypeScript'
    );

    await expect(
      todoPage.getTodo('Practice TypeScript')
    ).toBeVisible();

    await expect(
      todoPage.getTodo('Practice Typescript')
    ).toHaveCount(0);
  });

  test('should delete a todo', async () => {
    await todoPage.addTodo('Learn Playwright');
    await todoPage.addTodo('Practice TypeScript');

    await todoPage.deleteTodo('Learn Playwright');

    await expect(todoPage.getTodo('Learn Playwright')).toHaveCount(0);
    await expect(todoPage.todoItems).toHaveCount(1);
  });

  test('should clear completed todos without deleting active todos', async () => {
    await todoPage.addTodo('Learn Playwright');
    await todoPage.addTodo('Practice TypeScript');
    await todoPage.addTodo('Build QA Tests');

    await todoPage.completeTodo('Learn Playwright');

    await todoPage.clearCompleted();

    await expect(todoPage.getTodo('Learn Playwright')).toHaveCount(0);
    await expect(todoPage.todoItems).toHaveCount(2);

    await expect(todoPage.getTodo('Practice TypeScript')).toBeVisible();
    await expect(todoPage.getTodo('Build QA Tests')).toBeVisible();
  });
});