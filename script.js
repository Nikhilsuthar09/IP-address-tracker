"use strict";
      const birthDay = document.getElementById("day");
      const birthMonth = document.getElementById("month");
      const birthYear = document.getElementById("year");
      const calcDay = document.querySelector(".calculated-days");
      const calcMonth = document.querySelector(".calculated-months");
      const calcYear = document.querySelector(".calculated-years");

      // prevent clicking other than numbers
      document
        .querySelector(".input")
        .addEventListener("keypress", function (event) {
          if (event.key < "0" || event.key > "9") {
            event.preventDefault();
          }
        });
        
      function errorColors(){
        const errorColorBorder = document.querySelectorAll('input[type="number"]');
        const errorColorHeading = document.querySelectorAll('.input-date-container p');
        errorColorHeading.forEach((p) => (p.style.color = "#ff5757"));
        errorColorBorder.forEach((inputs) => (inputs.style.borderColor = "#ff5757"));
      }


      function calculate() {
        const today = new Date();
        const currentYear = today.getFullYear();
        
      
        // reset previous error messages
        document
          .querySelectorAll("span")
          .forEach((span) => (span.style.display = "none"));
          document.querySelectorAll('input[type="number"]').forEach((inputs) => (inputs.style.borderColor="#854dff"))
          document.querySelectorAll('.input-date-container p').forEach((p) => (p.style.color="#716f6f"))

        // validate input fields
        if (!birthDay.value) {
          document.querySelector(".span-day").textContent =
            "This field is required";
          document.querySelector(".span-day").style.display = "block";
          errorColors();
          
        }
        if (!birthMonth.value) {
          document.querySelector(".span-month").textContent =
            "This field is required";
          document.querySelector(".span-month").style.display = "block";
          errorColors();
        }
        if (!birthYear.value) {
          document.querySelector(".span-year").textContent =
            "This field is required";
          document.querySelector(".span-year").style.display = "block";
          errorColors();
        }
        const day = parseInt(birthDay.value);
        const month = parseInt(birthMonth.value);
        const year = parseInt(birthYear.value);
        // check if day month and year are valid numbers
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
          return;
        }

        // validate month
        if (month < 0 || month > 12) {
          document.querySelector(".span-month").textContent = "Invalid Month";
          document.querySelector(".span-year").style.display = "block";
          errorColors();
          return;
        }
        const maxDayInMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > maxDayInMonth) {
          document.querySelector(".span-day").textContent = "Invalid Day";
          document.querySelector(".span-day").style.display = "block";
          errorColors();
          return;
        }
        if (year > currentYear) {
          document.querySelector(".span-year").textContent = "Must be in the past";
          document.querySelector(".span-year").style.display = "block";
          errorColors();
          return;
        }
        const birthdate = new Date(year, month - 1, day);
        const diffInMilliSeconds = today - birthdate;
        const ageDate = new Date(diffInMilliSeconds);
        const years = ageDate.getUTCFullYear() - 1970;
        const months = ageDate.getUTCMonth();
        const days = ageDate.getUTCDay();

        // display calculated age
        calcYear.textContent = years;
        calcMonth.textContent = months;
        calcDay.textContent = days;
      }

      