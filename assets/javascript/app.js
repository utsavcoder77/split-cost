(() => {

    function User(firstName, lastName, email, mobile, profilePicture) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobile = mobile;
        this.profilePicture = profilePicture;
    }

    function ExpensesItem(description, amount) {
        this.description = description;
        this.amount = amount;
        this.isSettled = false;
        this.date = new Date();
    }

    function SplitCost() {
        this.users = getUsers();
        this.expenses = [];
        this.unsettledAmount = 0;

        this.addNewExpenses = function(newExpenses) {
            this.expenses.unshift(newExpenses);
        }

        this.settleNow = function() {
                this.expenses.forEach(expense => {
                    expense.isSettled = true;
                })
        }

        this.calculateUnsettledAmount = function() {
            const userCount = this.users.length;
            let totalExpenses = 0;
            this.expenses.forEach(expense => {
                if(!expense.isSettled){
                    totalExpenses += expense.amount;
                }
            });
            this.unsettledAmount = totalExpenses / userCount
        }
    }



    function getUsers() {
        const user1 = new User("Utsab", "Baral", "utsab.baral@gmail.com", "0420400163", "https://api.multiavatar.com/Binx Bond.svg");
        const user2 = new User("Alex", "Lee", "alex.lee@gmail.com", "0420400123", "https://api.multiavatar.com/kathrin.svg");
        const user3 = new User("Steve", "Jobs", "steve.jobs@gmail.com", "0420120163", "https://api.multiavatar.com/Binx Bond.svg");
        const user4 = new User("Elon", "Mustk", "elon.musk@gmail.com", "0420400124", "https://api.multiavatar.com/zoe.svg");
        const user5 = new User("Jet", "Lee", "jet.lee@gmail.com", "0456790412", "https://api.multiavatar.com/zoe.svg")
        const users = [user1, user2, user3, user4, user5];
        return users;
    }

    function getExpenses() {
        const expenses1 = new ExpensesItem("Woolworths Shopping", 120);
        const expenses2 = new ExpensesItem("Aldi", 160.00);
        expenses2.settled = true;
        const allExpenses = [expenses1, expenses2, expenses1, expenses2];
        return allExpenses;
    }   

    function removeUser(event){
        const index = event.target.getAttribute("data-index");
        if((splitCostObject.users.length > 1) && !splitCostObject.unsettledAmount){
            splitCostObject.users.splice(index, 1);
            populateUsers(splitCostObject.users);
        
        }
    }

    function populateUsers(users) {
        const userContainer = document.querySelector(".users-container");
        const userElements = users.map((user, index) => {
            return `
            <div><img data-index="${index}" width="112" src="${user.profilePicture}" alt="${user.firstName} ${user.lastName}" /></div>
            `
        });
        userContainer.innerHTML = userElements.join("");
        const imageElements = document.querySelectorAll(".users-container img");
        imageElements.forEach(img => {
            img.addEventListener("click", removeUser);
        })
    }
    

    function populateExpenses(expenses) {
        const expensesContainer = document.querySelector("#all-expenses");
        const expenseElements = expenses.map((expense) => {
            return `
            <div ${expense.isSettled ? "class=settled-row" : ""}>
                <div>
                    <span>${expense.description}</span>
                    <time>${expense.date}</time>
                </div>
                <div  class="amount">
                    $${expense.amount}
                </div>
            </div>
            `
        });
        expensesContainer.innerHTML = expenseElements.join("");
    }

    function populateUnsettledAmount() {
        splitCostObject.calculateUnsettledAmount();
        const unsettledAmount =  splitCostObject.unsettledAmount;
        document.getElementById("unsettled-amount").textContent = unsettledAmount.toFixed(2);
    }

    function addNewExpense(event) {
        event.preventDefault();
        const descriptionElement = document.querySelector("textarea");
        const amountElement = document.querySelector("input");
        const errorElement = document.querySelector("#error-msg");
        const description = descriptionElement.value;
        const amount = amountElement.value;
        if(!description || !amount) {
            errorElement.textContent = "Description and amount are required";
            return
        };
        
        const newExpense = new ExpensesItem(description, parseFloat(amount));
        splitCostObject.addNewExpenses(newExpense);
        populateUnsettledAmount();
        populateExpenses(splitCostObject.expenses);
        descriptionElement.value = "";
        amountElement.value = "";
        errorElement.textContent = "";
    }

    function settleExpenses() {
        splitCostObject.settleNow();
        populateExpenses(splitCostObject.expenses);
        populateUnsettledAmount();
    }

    function addNewEventListener() {
        const newButtonElement = document.querySelector(".new-container button");
        newButtonElement.addEventListener("click", addNewExpense);
        
    }

    function addSettleNowEventListner(){
        const settleNow = document.querySelector("#settle-now-btn");
        settleNow.addEventListener("click", settleExpenses);
    }


    addNewEventListener();
    addSettleNowEventListner();

    const splitCostObject = new SplitCost();
    populateUsers(splitCostObject.users);
    populateExpenses(splitCostObject.expenses);

    


    
})();

