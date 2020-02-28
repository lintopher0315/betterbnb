# Overview

For all unit tests that are not automated via code, the results of them shall be recorded here


# Sprint 1

* User Story 2:
As of 2/28/20, registration works.

Multiple different personal google accounts were registered succesfully and able to login via Google. 

For future sprints we will need to connect login registration to our backend to save username information and link accoutns. This will be done in sprint 2.


* User Story 3:
As of 2/28/20, search bar autofill works correctly. Lists in alphabetical order/order of importance areas by letter.

Some examples:
    
    "W" returns:
                Washington (Washington D.C.)
                Worli Koliwada (India)
                West Lafayette (Indiana)
                West Point (Westpoint) (Indiana)
                Witchita (Kansas)

    "N" returns:
                New York City (New York)
                Nagenahalli (India)
                Norma Jean Addition (Lafayette Indiana)
                North Crane (Indiana)
                Nashville (Tennessee)


Only thing to limit would be country if we do choose to keep scope small for now. As of now it lists international locations too.

* User Story 6: As a developer, I want to be able to easily integrate use of more apis so that I can improve the quality of service.

As of 2/28/20  when endpoints were removed, the chrome extension did not, as expected, show the results that are dependent on that api. 
The compiled_info.py script worked well to ensure that the project was not overly dependent on one script.


* User Story 7: I would like to access a page that can contact the service.

As of 2/28/20, the contact information page is accesible on the website, and through any subpage on the site.
The form also clears when submit is pressed, fufilling the acceptance criteria needed for this sprint.
Functionality still needs to be added. As we work in sprint 2 and backend funcitonality is connected,
contact form submissions to be sent to some email and stored, at least temporaraily, in our MongoDB backend.


# Sprint 2

TBD


# Sprint 3

TBD
