 // Notification system
      function showNotification(message, type) {
        const notification = document.getElementById("notification");
        notification.textContent = message;
        notification.className = `notification ${type} show`;

        setTimeout(() => {
          notification.classList.remove("show");
        }, 3000);
      }
      window.showNotification = showNotification;

      // Search functionality
      document
        .getElementById("searchInput")
        .addEventListener("input", function (e) {
          const searchTerm = e.target.value.toLowerCase();
          const elements = document.querySelectorAll(".ui-element");

          elements.forEach((element) => {
            const text = element.textContent.toLowerCase();
            const elementName = element.getAttribute("data-element");

            if (text.includes(searchTerm) || elementName.includes(searchTerm)) {
              element.style.display = "block";
              // Highlight search terms
              if (searchTerm) {
                highlightText(element, searchTerm);
              } else {
                removeHighlight(element);
              }
            } else {
              element.style.display = "none";
            }
          });
        });

      function highlightText(element, searchTerm) {
        removeHighlight(element);
        const walker = document.createTreeWalker(
          element,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );

        const textNodes = [];
        let node;

        while ((node = walker.nextNode())) {
          textNodes.push(node);
        }

        textNodes.forEach((textNode) => {
          if (textNode.textContent.toLowerCase().includes(searchTerm)) {
            const parent = textNode.parentNode;
            const regex = new RegExp(`(${searchTerm})`, "gi");
            const highlighted = textNode.textContent.replace(
              regex,
              '<span class="search-highlight">$1</span>'
            );

            if (highlighted !== textNode.textContent) {
              const span = document.createElement("span");
              span.innerHTML = highlighted;
              parent.replaceChild(span, textNode);
            }
          }
        });
      }

      function removeHighlight(element) {
        const highlighted = element.querySelectorAll(".search-highlight");
        highlighted.forEach((span) => {
          span.outerHTML = span.innerHTML;
        });
      }

      // Radio buttons
      document.querySelectorAll('input[name="pizza-size"]').forEach((radio) => {
        radio.addEventListener("change", function () {
          const result = document.getElementById("pizza-result");
          const labels = {
            small: "Мала (20см) - 120₴",
            medium: "Середня (30см) - 180₴",
            large: "Велика (40см) - 250₴",
          };
          result.textContent = labels[this.value];
        });
      });

      // Checkboxes for hotel services
      const serviceCheckboxes = ["wifi", "breakfast", "parking", "spa"];
      const servicePrices = {
        wifi: 50,
        breakfast: 150,
        parking: 100,
        spa: 200,
      };

      serviceCheckboxes.forEach((service) => {
        document
          .getElementById(service)
          .addEventListener("change", updateTotalCost);
      });

      function updateTotalCost() {
        let total = 0;
        serviceCheckboxes.forEach((service) => {
          if (document.getElementById(service).checked) {
            total += servicePrices[service];
          }
        });
        document.getElementById("total-cost").textContent = total + "₴/день";
      }

      // Form validation
      function validateForm() {
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!firstName || !lastName || !email) {
          showNotification("Будь ласка, заповніть обов'язкові поля!", "error");
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showNotification("Введіть правильний email!", "error");
          return;
        }

        showNotification("Форма успішно перевірена!", "success");
      }
      window.validateForm = validateForm;

      // Character count for textarea
      document.getElementById("comment").addEventListener("input", function () {
        const count = this.value.length;
        document.getElementById("charCount").textContent = count;

        if (count > 500) {
          this.value = this.value.substring(0, 500);
          document.getElementById("charCount").textContent = 500;
        }
      });

      // Tabs functionality
      function showTab(tabName) {
        // Hide all tab contents
        document.querySelectorAll(".tab-content").forEach((content) => {
          content.classList.remove("active");
        });

        // Remove active class from all buttons
        document.querySelectorAll(".tab-button").forEach((button) => {
          button.classList.remove("active");
        });

        // Show selected tab content
        document.getElementById(`content-${tabName}`).classList.add("active");
        document.getElementById(`tab-${tabName}`).classList.add("active");
      }
      window.showTab = showTab;

      // Loading button simulation
      function simulateLoading() {
        const btn = document.getElementById("loadingBtn");
        const loading = btn.querySelector(".loading");
        const normalText = btn.querySelector(".normal-text");

        loading.classList.add("show");
        normalText.style.display = "none";
        btn.disabled = true;

        setTimeout(() => {
          loading.classList.remove("show");
          normalText.style.display = "inline";
          btn.disabled = false;
          showNotification("Дані успішно оновлені!", "success");
        }, 2000);
      }
      window.simulateLoading = simulateLoading;

      // Link highlighting
      function highlightLink(link) {
        // Remove previous highlights
        document.querySelectorAll("nav a").forEach((a) => {
          a.classList.remove("font-bold", "text-blue-800");
        });

        // Highlight clicked link
        link.classList.add("font-bold", "text-blue-800");
        showNotification(`Перехід на: ${link.textContent}`, "info");
      }
      window.highlightLink = highlightLink;

      // Dropdown functionality
      function toggleDropdown(dropdownId) {
        const dropdown = document.getElementById(dropdownId).parentNode;
        dropdown.classList.toggle("open");

        // Close other dropdowns
        document.querySelectorAll(".dropdown").forEach((d) => {
          if (d !== dropdown) {
            d.classList.remove("open");
          }
        });
      }
      window.toggleDropdown = toggleDropdown;

      function selectCountry(country) {
        document.getElementById("selected-country").textContent = country;
        document
          .getElementById("country-dropdown")
          .parentNode.classList.remove("open");
        showNotification(`Вибрано країну: ${country}`, "success");
      }
      window.selectCountry = selectCountry;

      function selectDelivery(delivery) {
        document.getElementById("selected-delivery").textContent = delivery;
        document
          .getElementById("delivery-dropdown")
          .parentNode.classList.remove("open");
        showNotification(`Спосіб доставки: ${delivery}`, "success");
      }
      window.selectDelivery = selectDelivery;

      function selectCategory(category) {
        document.getElementById("selected-category").textContent = category;
        document
          .getElementById("category-dropdown")
          .parentNode.classList.remove("open");
        showNotification(`Категорія: ${category}`, "info");
      }
      window.selectCategory = selectCategory;

      // Multiselect functionality
      let selectedSkills = ["JavaScript", "React"];

      function toggleMultiselect() {
        toggleDropdown("skills-dropdown");
      }
      window.toggleMultiselect = toggleMultiselect;

      function toggleSkill(skill) {
        const index = selectedSkills.indexOf(skill);
        if (index > -1) {
          selectedSkills.splice(index, 1);
        } else {
          selectedSkills.push(skill);
        }
        updateSelectedSkills();
      }
      window.toggleSkill = toggleSkill;

      function removeSkill(event, skill) {
        event.stopPropagation();
        const index = selectedSkills.indexOf(skill);
        if (index > -1) {
          selectedSkills.splice(index, 1);
          updateSelectedSkills();
        }
      }
      window.removeSkill = removeSkill;

      function updateSelectedSkills() {
        const container = document.getElementById("selected-skills");
        container.innerHTML = "";

        selectedSkills.forEach((skill) => {
          const tag = document.createElement("span");
          tag.className = "multiselect-tag";
          tag.innerHTML = `${skill} <span class="remove" onclick="removeSkill(event, '${skill}')">×</span>`;
          container.appendChild(tag);
        });

        if (selectedSkills.length === 0) {
          container.innerHTML =
            '<span class="text-gray-400">Навички не обрано</span>';
        }
      }

      // Data grid functionality
      let sortOrder = {};

      function sortTable(columnIndex) {
        const table = document.getElementById("usersTable");
        const tbody = table.querySelector("tbody");
        const rows = Array.from(tbody.querySelectorAll("tr"));

        const currentOrder = sortOrder[columnIndex] || "asc";
        const newOrder = currentOrder === "asc" ? "desc" : "asc";
        sortOrder[columnIndex] = newOrder;

        rows.sort((a, b) => {
          const aValue = a.cells[columnIndex].textContent.trim().toLowerCase();
          const bValue = b.cells[columnIndex].textContent.trim().toLowerCase();

          if (newOrder === "asc") {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        });

        rows.forEach((row) => tbody.appendChild(row));

        // Update sort indicators
        document.querySelectorAll(".sort-indicator").forEach((indicator) => {
          indicator.textContent = "↕️";
        });

        const indicator = table.querySelector(
          `th:nth-child(${columnIndex + 1}) .sort-indicator`
        );
        indicator.textContent = newOrder === "asc" ? "↑" : "↓";

        showNotification(
          `Сортування по колонці ${columnIndex + 1} (${
            newOrder === "asc" ? "за зростанням" : "за спаданням"
          })`,
          "info"
        );
      }
      window.sortTable = sortTable;

      function editUser(button) {
        const row = button.closest("tr");
        const name = row.cells[1].textContent;
        showNotification(`Редагування користувача: ${name}`, "info");
      }
      window.editUser = editUser;

      function deleteUser(button) {
        if (confirm("Ви впевнені, що хочете видалити цього користувача?")) {
          const row = button.closest("tr");
          const name = row.cells[1].textContent;
          row.remove();

          // Update counts
          const remaining =
            document.querySelectorAll("#usersTableBody tr").length;
          document.getElementById("showing-count").textContent = remaining;
          document.getElementById("total-count").textContent = remaining;

          showNotification(`Користувача ${name} видалено`, "success");
        }
      }
      window.deleteUser = deleteUser;

      function addNewUser() {
        const tbody = document.getElementById("usersTableBody");
        const newId = (tbody.children.length + 1).toString().padStart(3, "0");

        const newRow = tbody.insertRow();
        newRow.innerHTML = `
                <td>${newId}</td>
                <td>Новий користувач</td>
                <td>new.user@example.com</td>
                <td><span class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Користувач</span></td>
                <td><span class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Активний</span></td>
                <td>
                    <button onclick="editUser(this)" class="text-blue-600 hover:text-blue-800 mr-2">✏️</button>
                    <button onclick="deleteUser(this)" class="text-red-600 hover:text-red-800">🗑️</button>
                </td>
            `;

        // Update counts
        const total = tbody.children.length;
        document.getElementById("showing-count").textContent = total;
        document.getElementById("total-count").textContent = total;

        showNotification("Новий користувач додан до таблиці", "success");
      }
      window.addNewUser = addNewUser;

      // User search functionality
      document
        .getElementById("userSearch")
        .addEventListener("input", function (e) {
          const searchTerm = e.target.value.toLowerCase();
          const rows = document.querySelectorAll("#usersTableBody tr");
          let visibleCount = 0;

          rows.forEach((row) => {
            const text = row.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
              row.style.display = "";
              visibleCount++;
            } else {
              row.style.display = "none";
            }
          });

          document.getElementById("showing-count").textContent = visibleCount;
        });

      // Close dropdowns when clicking outside
      document.addEventListener("click", function (event) {
        if (
          !event.target.closest(".dropdown") &&
          !event.target.closest(".multiselect")
        ) {
          document.querySelectorAll(".dropdown, .multiselect").forEach((el) => {
            el.classList.remove("open");
          });
        }
      });

      // Initialize
      updateSelectedSkills();

      console.log("🎉 Інтерактивний посібник UI елементів завантажений!");
      console.log(
        "Всі елементи повністю функціональні та готові до демонстрації."
      );