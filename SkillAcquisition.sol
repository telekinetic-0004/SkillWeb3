// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SkillAcquisition {
    // Define the Academic Institution struct
    struct AcademicInstitution {
        address academician;
        string name;
        string program;
    }

    // Define the Skill Holder struct
    struct SkillHolder {
        address individual;
        mapping(address => uint) financialAssets;
        mapping(address => mapping(string => bool)) acquiredSkills;
        string name;
        string email;
    }

    // Mapping of Skill Holder addresses to their corresponding structs
    mapping(address => SkillHolder) public skillHolders;

    // Mapping of Academic Institution addresses to their corresponding structs
    mapping(address => AcademicInstitution) public academicInstitutions;

    // Array to store all the addresses of the Skill Holders
    address[] public skillHolderAddresses;

    // Array to store all the addresses of the Academic Institutions
    address[] public academicInstitutionAddresses;

    // Event for when an individual enrolls in a program
    event Enrollment(address indexed individual, address indexed academicInstitution, string program);

    // Event for when an individual acquires a skill
    event SkillAcquisitionEvent(address indexed individual, address indexed academicInstitution, string skill);

    // Function for an academician to enroll an individual in a program
    function enrollInProgram(address _individual, address _academicInstitution, string memory _program) public {
        require(academicInstitutions[_academicInstitution].academician == msg.sender, "Only academicians can enroll individuals in programs");
        skillHolders[_individual].financialAssets[_academicInstitution] += 100; // Assume 100 is the cost of enrollment
        emit Enrollment(_individual, _academicInstitution, _program);
    }

    // Function for an academician to mark a skill as acquired by an individual
    function acquireSkill(address _individual, address _academicInstitution, string memory _skill) public {
        require(academicInstitutions[_academicInstitution].academician == msg.sender, "Only academicians can mark skills as acquired");
        bool skillAlreadyAcquired = skillHolders[_individual].acquiredSkills[_academicInstitution][_skill];
        require(!skillAlreadyAcquired, "Skill has already been acquired");
        skillHolders[_individual].acquiredSkills[_academicInstitution][_skill] = true;
        emit SkillAcquisitionEvent(_individual, _academicInstitution, _skill);
    }

    // Function to store user data (name and email)
    function storeUserData(string memory _name, string memory _email) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        skillHolders[msg.sender].name = _name;
        skillHolders[msg.sender].email = _email;
        skillHolderAddresses.push(msg.sender);
    }

    // Function to get all the Skill Holders
    function getSkillHolders() public view returns (address[] memory) {
        return skillHolderAddresses;
    }

    // Function to get all the Academic Institutions
    function getAcademicInstitutions() public view returns (address[] memory) {
        return academicInstitutionAddresses;
    }
}
