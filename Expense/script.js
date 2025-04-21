document.addEventListener("DOMContentLoaded", function () {
    const incomeDescription = document.getElementById('income-description');
    const incomeAmount = document.getElementById('income-amount');
    const expenseDescription = document.getElementById('expense-description');
    const expenseCategory = document.getElementById('expense-category');
    const expenseAmount = document.getElementById('expense-amount');
    const transactionHistory = document.getElementById('transaction-history');
    const totalIncomeDisplay = document.getElementById('total-income');
    const totalExpensesDisplay = document.getElementById('total-expenses');
    const balanceDisplay = document.getElementById('balance');

    let totalIncome = 0;
    let totalExpenses = 0;

    window.addIncome = function () {
        const description = incomeDescription.value.trim();
        const amount = parseFloat(incomeAmount.value.trim());

        if (description === '' || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid income description and amount.");
            return;
        }

        totalIncome += amount;
        addTransaction(description, amount, "Income", "Income");
        updateSummary();
        clearIncomeFields();
    };

    window.addExpense = function () {
        const description = expenseDescription.value.trim();
        const category = expenseCategory.value;
        const amount = parseFloat(expenseAmount.value.trim());

        if (description === '' || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid expense description and amount.");
            return;
        }

        totalExpenses += amount;
        addTransaction(description, amount, category, "Expense");
        updateSummary();
        clearExpenseFields();
    };

    function addTransaction(description, amount, category, type) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${description}</td>
            <td>${category}</td>
            <td>$${amount.toFixed(2)}</td>
            <td>${type}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;

        transactionHistory.appendChild(row);

        row.querySelector('.delete-btn').addEventListener('click', function () {
            row.remove();
            if (type === "Income") {
                totalIncome -= amount;
            } else {
                totalExpenses -= amount;
            }
            updateSummary();
        });
    }

    function updateSummary() {
        totalIncomeDisplay.textContent = totalIncome.toFixed(2);
        totalExpensesDisplay.textContent = totalExpenses.toFixed(2);
        balanceDisplay.textContent = (totalIncome - totalExpenses).toFixed(2);
    }

    function clearIncomeFields() {
        incomeDescription.value = '';
        incomeAmount.value = '';
    }

    function clearExpenseFields() {
        expenseDescription.value = '';
        expenseAmount.value = '';
        expenseCategory.value = 'Housing';
    }

    window.clearAll = function () {
        transactionHistory.innerHTML = '';
        totalIncome = 0;
        totalExpenses = 0;
        updateSummary();
    };
});