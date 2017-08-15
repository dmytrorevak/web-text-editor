(function initTheEditor() {
    
    // Variable declaration //////////////////////////////////////////////////////////////////////////////////////////

    // Main panels and needed working containers
    var $showingTextPanel = document.querySelector('.showing-text-panel'),
        $showTextContainer = document.querySelector('.showing-text-panel__show-container'),
        $textEditingPanel = document.querySelector('.text-editing-panel'),
        $userWorkingArea = document.getElementById('text-editing-area'),
        $fontEditPanel = document.querySelector('.font-editing-panel'),
        $tableListCreatingPanel = document.querySelector('.table-list-creating-panel');
        
    // Control buttons
    var $editButton = document.querySelector('.edit-button'),
        $styleButton = document.querySelector('.style-button'),
        $saveButton = document.querySelector('.save-button'),
        $addingButton = document.querySelector('.add-button'),
        $blockingButton = document.querySelector('.block-button');

    // Font editing panels selects and inputes. Addition buttons
    var $fontSizeInputes = document.querySelectorAll('[name="font-size-value"]'),
        $textAlignInputes = document.querySelectorAll('[name="font-align-value"]'),
        $fontFamilyList = document.querySelector('.font-family-panel__select-list'),
        $fontColorList = document.querySelector('.font-color-panel__select-list'),
        $backgroundPanelBtn = document.querySelector('.background-panel__button'),
        $backgroundColorList = document.querySelector('.background-panel__color-select-list'),
        $backgroundImageList = document.querySelector('.background-panel__image-select-list'),
        $boldTextInput = document.querySelector('.bold-text-toogle__input'),
        $italicTextInput = document.querySelector('.italic-text-toogle__input'),
        $underlineTextInput = document.querySelector('.underline-text-toogle__input');

    // Create Table and create List panels elements
    var $tableListCreatingForms = document.querySelectorAll('.table-list-add-panel'),
        $chooseTableListForms = document.querySelectorAll('[name="adding-panel-radio"]'),
        $chooseListStyleInputes = document.querySelectorAll('[name="choose-list-style-radio"]'),
        $createTableButton = document.querySelector('[name="create-table"]'),
        $resetTableButton = document.querySelector('[name="reset-table"]'),
        $unorderedListPanel = document.querySelector('.unordered-list-style'),
        $orderedListPanel = document.querySelector('.ordered-list-style'),
        $listAmountInputWrapper = document.querySelector('.list-elements-amount-wrapper'),
        $listCreatingButtonsWrapper = document.querySelector('.creating-list-buttons'),
        $resetListButton = document.querySelector('[name="reset-list"]'),
        $createListButton = document.querySelector('[name="create-list"]'),
        $inputesForValidation = document.querySelectorAll('[data-validate]');

    // Modal window elements
    var $modalWindow = document.querySelector('.modal-window'),
        $passwordInput = document.querySelector('[type="password"]'),
        $continueButton = document.querySelector('[name="continue"]');

    // Function description ///////////////////////////////////////////////////////////////////////////////////////////

    // Initialised select animation for materialize
    $(document).ready(function() {
        $('select').material_select();
    });

    // Function gets some string date and put it as textarea value for user editing
    function setDateToTextarea(date) {
        $userWorkingArea.value += date;
    }

    // Change appropriate font property for showing container. Take property value from changint element 
    function changeShowingTextPropertyValue(elementWithValue, property) {
        $showTextContainer.style[property] = elementWithValue.value;
    }

    // Function which runs font parameters changing function when user select some value for appropriate select list of parameters
    function setOnchangeFunctionsForSelect(selectList, property) {
        for (var i = 0; i < selectList.length; i++) {
            if (selectList[i].selected) {
                changeShowingTextPropertyValue(selectList[i], property);
            }
        }
    }

    // Function which toggle bold, italic or underline text (checkbox) paremeter for showing container
    function switchPropertyByCheckbox(element, property, defaultParameter) {
        if (element.checked) {
            changeShowingTextPropertyValue(element, property);
        } else {
            $showTextContainer.style[property] = defaultParameter;
        }   
    }

    // Switches display property for element. Makes it visible or unvisible  
    function swithcElementVisibility(element, dispProperty, switchVisibility) {
        if (switchVisibility) {
            if (getComputedStyle(element).display === 'none') {
                element.style.display = dispProperty;
            } else {
                element.style.display = 'none';
            }
        } else {
            element.style.display = dispProperty;
        }
    }

    // Function which get group of elements and make all of them unvisible except one element
    function showOneOfTheSetElements(setOfElements, elementToShow, dispProperty) {
        for (var i = 0; i < setOfElements.length; i++) {
            if (setOfElements[i] === elementToShow) {
                swithcElementVisibility(elementToShow, dispProperty, true); 
            } else {
                setOfElements[i].style.display = 'none';
            }
        }
    }

    // Finds the element by it's selector and returns the selected element value
    function returnElementValue(elementSelector) {
        return parseInt(document.querySelector(elementSelector).value);
    }

    // Set default value for an each select list item
    function reserSelectList() {
        for (var i = 0; i < arguments[0].length; i++) {
            for (var j = 0; j < arguments[0][i].length; j++) {
                arguments[0][i][j].selectedIndex = 0;        
            }
        }
    }

    // Creates the table with table-input parameters which are entered by user
    function createTable() {
        // Create table element, get style parameters for it and set them for one
        var table  = document.createElement('table'),
            tableBorderWidth = returnElementValue('#table-border-line-widht') + 'px',
            borderStyleSelect = document.querySelector('select.table-line-type__select-list'),
            borderColorSelect = document.querySelector('select.table-line-color__select-list'),
            tableBorderStyle = borderStyleSelect.options[borderStyleSelect.selectedIndex].value,
            tableBorderColor = borderColorSelect.options[borderColorSelect.selectedIndex].value;
        
        // Set table parameters for a table
        table.style.border = tableBorderWidth + ' ' + tableBorderStyle + ' ' + tableBorderColor;

        //Ser the border-spacing property
        table.style.borderSpacing = returnElementValue('#table-cellspacing') + 'px';

        // Create needed amount of rows
        for(var i = 0; i < returnElementValue('#row-amount'); i++) {
            var tableRow = document.createElement('tr');
            // Create needed amount of columns
            for(var j = 0; j < returnElementValue('#column-amount'); j++) {
                var tableColumn = document.createElement('td');
                // Get columns style parameters and set it for each column
                tableColumn.style.height = returnElementValue('#table-cell-height') + 'px';
                tableColumn.style.width = returnElementValue('#table-cell-width') + 'px';
                tableColumn.style.border = tableBorderWidth + ' ' + tableBorderStyle + ' ' + tableBorderColor;
                // Add each created column to row
                tableRow.appendChild(tableColumn);
            }
            // Add each created row to table
            table.appendChild(tableRow);
        }

        // Return complete table 
        return table.outerHTML;
    }
    
    // Creates the list with list-input parameters which are entered by user
    function createList(listType) {

        // Create specify list element
        var list = document.createElement(listType);

        // Add certain amount of items for that list
        for (var i = 0; i < returnElementValue('#list-elements-amount'); i++) {
            var listItem = document.createElement('li');
            listItem.innerHTML = 'item ' + (i + 1);
            list.appendChild(listItem);
        }

        // Get the user selected list mark type property
        var $listMarkTypeSelect,
            $listMarkType;

        if (listType === 'ul') {
            $listMarkTypeSelect = document.querySelector('select.unordered-list-style__select-list');
            $listMarkType = $listMarkTypeSelect.options[$listMarkTypeSelect.selectedIndex].value;
        } else {
            $listMarkTypeSelect = document.querySelector('select.ordered-list-style__select-list');
            $listMarkType = $listMarkTypeSelect.options[$listMarkTypeSelect.selectedIndex].value;
        }

        // Set list mark type property to created list
        list.style.listStyleType = $listMarkType;
        return list.outerHTML;
    }

    // Verifies is user entered date integer number 
    function numericFieldValidation(element) {
        var dateForValidation = element.value;
        return parseInt(dateForValidation) == dateForValidation;
    }

    // Highlight the correct and incorrect field after validation
    function validationHighlight(element, isValid) {
        if (isValid) {
            element.style.borderBottom = '1px solid #4CAF50';
            element.style.boxShadow = '0 1px 0 0 #4CAF50';
        } else {
            element.style.borderBottom = '1px solid #F44336';
            element.style.boxShadow = '0 1px 0 0 #F44336';
        }

    }

    // Creates error label near the each invalid input
    function creatingErrorLabel(errorInput) {
        var errorLabel = document.createElement('span');
        errorLabel.innerHTML = 'It\'s only integer number allowed';
        errorLabel.className = 'error-input-label';
        errorInput.parentNode.insertBefore(errorLabel, errorInput);
    }
    
    // Application logic /////////////////////////////////////////////////////////////////////////////////////////

    // Transfer default text from showing container to the working area
    $userWorkingArea.value = $showTextContainer.innerHTML;

    // All main panel within one array
    var switchingPanels = [$showingTextPanel, $textEditingPanel, $tableListCreatingPanel];

    // Init all buttons panel logic
    (function initButtonsPanel() {

        // Make working area visible and other main panel invisible
        $editButton.onclick = function () {
            showOneOfTheSetElements(switchingPanels, $textEditingPanel, 'block');
        };

        // Transfer text from editing area to showing container as HTML markup and make showing panel visible
        $saveButton.onclick = function () {
            showOneOfTheSetElements(switchingPanels, $showingTextPanel, 'block');
            $showTextContainer.innerHTML = $userWorkingArea.value;
        };

        // Show or hide font edit panel after user's click on style button
        $styleButton.onclick  = function () {
            swithcElementVisibility($fontEditPanel, 'flex', true);
        };

        // Show table-list creatin pable and hide other main panels
        $addingButton.onclick = function () {
            showOneOfTheSetElements(switchingPanels, $tableListCreatingPanel, 'block');
        };

    })();

    // FONT EDITING PANEL LOGIC START -------------------------------------------------------------------------

    // Init all font editing panel logic
    (function initFontEditingPanel() {

        // Add changing font-size function for the each fontSize input
        $fontSizeInputes.forEach(function (item) {
            item.onchange = function () {
                changeShowingTextPropertyValue(this, 'fontSize');
            };
        });

        // Add changing text-align function for thr each textAlign input
        $textAlignInputes.forEach(function (item) {
            item.onchange = function () {
                changeShowingTextPropertyValue(this, 'textAlign');
            }; 
        });

        // Add changing font-family function for the fontFamily select and when user select to one of available item set showing block that font-family
        $fontFamilyList.onchange = function () {
            setOnchangeFunctionsForSelect($fontFamilyList, 'fontFamily');
        };
        
        // Add changing font-color function for the fontColor select and when user select to one of available item set showing block that font-color
        $fontColorList.onchange = function () {
            setOnchangeFunctionsForSelect($fontColorList, 'color');
        };

        $backgroundPanelBtn.onclick = function () {
            swithcElementVisibility( document.querySelector('.background-panel__color-panel'), 'block', true);
            swithcElementVisibility( document.querySelector('.background-panel__image-panel'), 'flex', true);
        };
        
        // Add changing background function for the backgroundColor select and when user select to one of available item set showing block that background-color. Also remove setted before backgroun-image
        $backgroundColorList.onchange = function () {
            setOnchangeFunctionsForSelect($backgroundColorList, 'backgroundColor');
            $showTextContainer.style.backgroundImage = '';
        };

        // Add changing background function for the backgroundImage select and when user select to one of available item set showing block that background-image
        $backgroundImageList.onchange = function () {
            setOnchangeFunctionsForSelect($backgroundImageList, 'backgroundImage');
        };
        
        // Add changing font-weight for showing panel when user switch the bold-text input 
        $boldTextInput.onchange = function () {
            switchPropertyByCheckbox($boldTextInput, 'fontWeight', 'normal');
        };
        
        // Add changing font-style for showing panel when user switch the style-text input 
        $italicTextInput.onchange = function () {
            switchPropertyByCheckbox($italicTextInput, 'fontStyle', 'normal');
        };

        // Add changing text-decoration (underline) for showing panel when user switch the underline-text input 
        $underlineTextInput.onchange = function () {
            switchPropertyByCheckbox($underlineTextInput, 'textDecoration', 'none');
        };

    })();

    // FONT EDITING PANEL LOGIC END -------------------------------------------------------------------------------

    // TABLE AND LIST PANELS LOGIC START--------------------------------------------------------------------------- 

    (function initTableListPanels() {

        // Switch visibility for table or list creating forms
        $chooseTableListForms.forEach(function (item) {
            item.onchange = function () {
                var showElement = document.querySelector(this.value);
                showOneOfTheSetElements($tableListCreatingForms, showElement, 'block');
            };
        });

        // Set the default table form state 
        var isTableFormValid = false;

        // Create table with user writted parameters and put it to the textarea
        $createTableButton.onclick = function () {

            // Validate all table form inputes for correct table crating
            var tableValidationInputes = document.querySelectorAll('.table-adding-panel input[data-validate]');
            tableValidationInputes.forEach(function (input) {
                if( numericFieldValidation(input) ) {
                    isTableFormValid = true;
                } else {
                    isTableFormValid = false;
                }
            });

            // When all inputes are valid create the table
            if (isTableFormValid) {
                setDateToTextarea( createTable() );
                
                // Trigger click event on 'save' button
                $saveButton.click();
            }

        };

        // Reset all table selects with attribute [data-reset-item="table"] and set for them dafault parameters
        $resetTableButton.onclick = function () {
            var selectForReset = document.querySelectorAll('[data-reset-item=' + this.dataset.reset + ']');
            reserSelectList(selectForReset);
        };
        
        // Save ordered and unerdered list panels to one array
        var listPanels = [$unorderedListPanel, $orderedListPanel];

        // Switch ordered and unerdered list panels visibility and make listItemAmount input invisible after user's input changing
        $chooseListStyleInputes.forEach(function (item) {
            item.onchange = function () {
                var showElement = document.querySelector(this.value);
                showOneOfTheSetElements(listPanels, showElement, 'block');
                swithcElementVisibility($listAmountInputWrapper, 'none');
                swithcElementVisibility($listCreatingButtonsWrapper, 'none'); 
            };
        });
        
        // Show list items amount input after user's choosing type of list mark
        listPanels.forEach(function (item) {
            item.children[1].onchange = function () {  
                swithcElementVisibility($listAmountInputWrapper, 'block');
            };
        });
        
        // Show creating list buttons after user's choosing amount of list items
        document.getElementById('list-elements-amount').onblur = function () {
            swithcElementVisibility($listCreatingButtonsWrapper, 'block');
        };

        // Reset all list selects with attribute [data-reset-item="list"] and set for them dafault parameters
        $resetListButton.onclick = function () {
            var selectForReset = document.querySelectorAll('[data-reset-item=' + this.dataset.reset + ']');
            reserSelectList(selectForReset);
        };

        // Set the default list form state
        var isListFormValid = false;

        // Create list with user writted parameters and put it to the textarea
        $createListButton.onclick = function () {
            
            // Validate all table form inputes for correct table crating
            var listValidationInputes = document.querySelectorAll('.list-adding-form input[data-validate]');
            listValidationInputes.forEach(function (input) {
                if( numericFieldValidation(input) ) {
                    isListFormValid  = true;
                } else {
                    isListFormValid  = false;
                }
            });

            // When all inputes are valid create the list
            if (isListFormValid) {
                if ($chooseListStyleInputes[0].checked) {
                    setDateToTextarea( createList('ul') );
                } else {
                    setDateToTextarea( createList('ol') );
                }

                // Trigger click event on 'save' button
                $saveButton.click();
            }
        };

        // Add validation, highlight and createErrorLabel functions for each table and list input 
        $inputesForValidation.forEach(function (item) {
            item.onchange = function () {

                // Start validation after inpute's onchange
                if ( numericFieldValidation(this) ) {

                    // Highlight field with green if it is valid and remove error label if it was been created
                    validationHighlight(this, true);
                    if (this.previousElementSibling) {
                        this.parentNode.removeChild(this.previousElementSibling);
                    }

                } else {

                    // Highlight field with red if it is invalid and create error label if it wasn't been created
                    validationHighlight(this, false);
                    if (!this.previousElementSibling) {
                        creatingErrorLabel(this);
                    }
                }
            };
        });

    })();

    // TABLE AND LIST PANELS LOGIC END--------------------------------------------------------------------------- 

    // All modal window logic

    (function initModalWindow() {

        // Block the application when user click on "block" button
        $blockingButton.onclick = function () {
            swithcElementVisibility($modalWindow, 'block');
        };

        // Verify the user's password
        $continueButton. onclick = function () {
            if ($passwordInput.value === 'password') {
                validationHighlight($passwordInput, true);

                // Hide error lable and make check border for password input 
                swithcElementVisibility($modalWindow, 'none');
                $passwordInput.value = '';
                $passwordInput.style.border = '';
                $passwordInput.style.boxShadow = '';
                swithcElementVisibility(document.querySelector('.modal-window__error-label'), 'none');
        } else {

            // Notice user about wrong attempt
            validationHighlight($passwordInput, false);
            swithcElementVisibility(document.querySelector('.modal-window__error-label'), 'inline');
        }
    };

    })();

})();