document.getElementById('enrollForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const academicianAddress = document.getElementById('academicianAddress').value;
    const program = document.getElementById('program').value;

    // Perform enrollment logic here
    // You can interact with the smart contract using Web3.js
});

document.getElementById('markSkillsForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const academicianAddress = document.getElementById('academicianAddressSkills').value;
    const skill = document.getElementById('skill').value;

    // Perform marking skills as acquired logic here
    // You can interact with the smart contract using Web3.js
});
