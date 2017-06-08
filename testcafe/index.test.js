import { expect } from 'chai';
import { Selector } from 'testcafe';

const host = process.env.HOST || 'localhost';
const MAIN_PAGE = `http://${host}:3000`;

const FIRST_TODO = 'First todo';
const SECOND_TODO = 'Second todo';
const TODO_EDITED = 'First todo 1';

const createTodo = async (t, title) => {
    await t.typeText(await Selector('input.new-todo'), title)
            .pressKey('enter');
}

// eslint-disable-next-line no-unused-expressions, no-undef
fixture`Todo list example`.beforeEach(async (t) => {
    await t.setNativeDialogHandler(() => true);
    await t.navigateTo(MAIN_PAGE);
});

test('base functionality', async (t) => {

    /* Create items */ {
        await createTodo(t, FIRST_TODO);
        await createTodo(t, SECOND_TODO);

        const items = Selector('.todo-list li');

        expect(await items.count).to.be.equal(2);
        expect(await items.nth(0).innerText).to.contain(SECOND_TODO);
        expect(await items.nth(1).innerText).to.contain(FIRST_TODO);
    }

    /* Complete item */ {
        const todo = Selector('.todo-list li').nth(0);
        const toggle = todo.find('.toggle');
        await t.click(toggle);
        expect(await todo.hasClass('completed')).to.be.equal(true);
    }

    /* Filters */ {
        const allLink = Selector('.filters a[href="/all"]');
        const activeLink = Selector('.filters a[href="/active"]');
        const completedLink = Selector('.filters a[href="/completed"]');

        await t.click(activeLink);
        const activeItems = Selector('.todo-list li');
        expect(await activeItems.count).to.be.equal(1);
        expect(await activeItems.nth(0).innerText).to.contain(FIRST_TODO);

        await t.click(completedLink);
        const completedItems = Selector('.todo-list li');
        expect(await completedItems.count).to.be.equal(1);
        expect(await completedItems.nth(0).innerText).to.contain(SECOND_TODO);

        await t.click(allLink);
        const allItems = Selector('.todo-list li');
        expect(await allItems.count).to.be.equal(2);
    }

    /* Edit item */ {
        await t.doubleClick(Selector('.todo-list label').nth(0));
        await t.typeText(await Selector('.todo-list .edit').nth(0), TODO_EDITED)
            .pressKey('enter');

        const items = Selector('.todo-list li');

        expect(await items.nth(0).innerText).to.contain(TODO_EDITED);
        expect(await items.nth(1).innerText).to.contain(FIRST_TODO);
    }

    /* Complete all item */ {
        const toggleAll = Selector('.toggle-all');

        await t.click(toggleAll);
        const completedItems = Selector('.todo-list li.completed');
        const items = Selector('.todo-list li');
        expect(await completedItems.count).to.be.equal(await items.count);

        await t.click(toggleAll);
        expect(await completedItems.count).to.be.equal(0);
    }

    /* Delete items */ {
        await t.hover(Selector('.todo-list li').nth(0));
        await t.click(Selector('.todo-list .destroy').nth(0));
        expect(await Selector('.todo-list li').count).to.be.equal(1);

        await t.hover(Selector('.todo-list li').nth(0));
        await t.click(Selector('.todo-list .destroy').nth(0));
        expect(await Selector('.todo-list li').count).to.be.equal(0);
    }

    /* Delete all completed items */ {
        await createTodo(t, FIRST_TODO);
        await createTodo(t, SECOND_TODO);

        await t.click(Selector('.toggle-all'));
        await t.click(Selector('.clear-completed'));

        const items = Selector('.todo-list li');
        expect(await items.count).to.be.equal(0);
    }
});