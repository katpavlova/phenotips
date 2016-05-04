/**
 * A place to define the sets of fields various pedigree node menus should have.
 *
 * Extensions can overwrite NodeMenuFields.extendPersonNodeFieldList() and/or
 * NodeMenuFields.extendGroupNodeFieldList() and/or NodeMenuFields.extendRelationshipFieldList()
 * to add custom fields or modify existing fields.
 *
 * @class NodeMenuFields
 * @constructor
 */
define([
        "pedigree/model/helpers"
    ], function(
        Helpers
    ){
    var NodeMenuFields = {};

    /*====================================================================*/

    /**
     * This method is supposed to be overwritten by extensions.
     *
     * @param {Array} fieldList default list of fields defined by the pedigree editor
     * @param {Array} disabledFields list of fields disbaled in this installation (as configured in admin section)
     * @return {Array} field list actually used to generate the menu diallogue, presumably with added or modified fields
     */
    NodeMenuFields.extendPersonNodeFieldList = function(fieldList, disabledFields) {
        return fieldList;   // stub: nothing gets added to the list
    },

    /**
     * This method is supposed to be overwritten by extensions
     *
     * @param {Array} fieldList default list of fields defined by the pedigree editor
     * @param {Array} disabledFields list of fields disbaled in this installation (as configured in admin section)
     * @return {Array} field list actually used to generate the menu diallogue, presumably with added or modified fields
     * @return field list array
     */
    NodeMenuFields.extendGroupNodeFieldList = function(fieldList, disabledFields) {
        return fieldList;   // stub: nothing gets added to the list
    },

    /**
     * This method is supposed to be overwritten by extensions
     *
     * @param {Array} fieldList default list of fields defined by the pedigree editor
     * @param {Array} disabledFields list of fields disbaled in this installation (as configured in admin section)
     * @return {Array} field list actually used to generate the menu diallogue, presumably with added or modified fields
     */
    NodeMenuFields.extendRelationshipFieldList = function(fieldList, disabledFields) {
        return fieldList;   // stub: nothing gets added to the list
    },

    /*====================================================================*/

    NodeMenuFields.getPersonNodeMenuFields = function(disabledFields) {
        var fieldList = [
            {
                'name' : 'identifier',
                'label' : '',
                'type'  : 'hidden',
                'tab': 'Personal'
            },
            /*{
                'name' : 'phenotipsid',
                'label' : 'Phenotips Patient Link',
                'type' : 'text', //phenotipsid-picker',
                'tab' : 'Personal',
                'function' : 'setPhenotipsPatientId'
            },*/
            {
                'name' : 'gender',
                'label' : 'Gender',
                'type' : 'radio',
                'tab': 'Personal',
                'columns': 3,
                'values' : [
                    { 'actual' : 'M', 'displayed' : 'Male' },
                    { 'actual' : 'F', 'displayed' : 'Female' },
                    { 'actual' : 'O', 'displayed' : 'Other' },
                    { 'actual' : 'U', 'displayed' : 'Unknown' }
                ],
                'default' : 'U',
                'function' : 'setGender'
            },
            {
                'name' : 'first_name',
                'label': 'First name',
                'type' : 'text',
                'tab': 'Personal',
                'function' : 'setFirstName'
            },
            {
                'name' : 'last_name',
                'label': 'Last name',
                'type' : 'text',
                'tab': 'Personal',
                'function' : 'setLastName'
            },
            {
                'name' : 'last_name_birth',
                'label': 'Last name at birth',
                'type' : 'text',
                'tab': 'Personal',
                'function' : 'setLastNameAtBirth'
            },
            {
                'name' : 'external_id',
                'label': 'External ID',
                'type' : 'text',
                'tab': 'Personal',
                'function' : 'setExternalID',
                // UI fix: if 'last_name_birth' is disabled, left-floating externalID element does not
                //         play nicely with ethnicities element; setting width to 100% fixes this
                'addCSS': Helpers.arrayContains(disabledFields, 'last_name_birth') ? {"width":"100%"} : null
            },
            {
                'name' : 'ethnicity',
                'label' : 'Ethnicities',
                'type' : 'ethnicity-picker',
                'tab': 'Personal',
                'function' : 'setEthnicities'
            },
            {
                'name' : 'carrier',
                'label' : 'Carrier status',
                'type' : 'radio',
                'tab': 'Clinical',
                'values' : [
                    { 'actual' : '', 'displayed' : 'Not affected' },
                    { 'actual' : 'carrier', 'displayed' : 'Carrier' },
                    //{ 'actual' : 'obligate', 'displayed' : 'Obligate carrier' },
                    { 'actual' : 'uncertain', 'displayed' : 'Uncertain' },
                    { 'actual' : 'affected', 'displayed' : 'Affected' },
                    { 'actual' : 'presymptomatic', 'displayed' : 'Pre-symptomatic' }
                ],
                'default' : '',
                'function' : 'setCarrierStatus'
            },
            {
                'name' : 'disorders',
                'label' : 'Known disorders of this individual',
                'type' : 'disease-picker',
                'tab': 'Clinical',
                'function' : 'setDisorders'
            },
            {
                'name' : 'hpo_positive',
                'label' : 'Clinical symptoms: observed phenotypes',
                'type' : 'hpo-picker',
                'tab': 'Clinical',
                'function' : 'setHPO'
            },
            {
                'name' : 'candidate_genes',
                'label' : 'Genotype information: candidate genes',
                'type' : 'gene-picker',
                'tab': 'Clinical',
                'function' : 'setGenes'
            },
            {
                'name' : 'date_of_birth',
                'label' : 'Date of birth',
                'type' : 'date-picker',
                'tab': 'Personal',
                'function' : 'setBirthDate'
            },
            {
                'name' : 'date_of_death',
                'label' : 'Date of death',
                'type' : 'date-picker',
                'tab': 'Personal',
                'function' : 'setDeathDate'
            },
            {
                'name' : 'gestation_age',
                'label' : 'Gestation age',
                'type' : 'select',
                'tab': 'Personal',
                'range' : {'start': 0, 'end': 50, 'item' : ['week', 'weeks']},
                'nullValue' : true,
                'function' : 'setGestationAge'
            },
            {
                'name' : 'state',
                'label' : 'Individual is',
                'type' : 'radio',
                'tab': 'Personal',
                'columns': 3,
                'valuesIE9' : [
                    // different order of options because they are displayed sequentially instead of in 3-column layout
                    { 'actual' : 'alive', 'displayed' : 'Alive' },
                    { 'actual' : 'deceased', 'displayed' : 'Deceased' },
                    { 'actual' : 'stillborn', 'displayed' : 'Stillborn' },
                    { 'actual' : 'unborn', 'displayed' : 'Unborn' },
                    { 'actual' : 'miscarriage', 'displayed' : 'Miscarried' },
                    { 'actual' : 'aborted', 'displayed' : 'Elective abortion' }],
                'values' : [
                    { 'actual' : 'alive', 'displayed' : 'Alive' },
                    { 'actual' : 'stillborn', 'displayed' : 'Stillborn' },
                    { 'actual' : 'deceased', 'displayed' : 'Deceased', 'columnshiftPX': -2 },
                    { 'actual' : 'miscarriage', 'displayed' : 'Miscarried', 'columnshiftPX': -2},
                    { 'actual' : 'unborn', 'displayed' : 'Unborn', 'columnshiftPX': 8 },
                    { 'actual' : 'aborted', 'displayed' : 'Aborted', 'columnshiftPX': 8 }],
                'default' : 'alive',
                'function' : 'setLifeStatus'
            },
            {
                'label' : 'Heredity options',
                'name' : 'childlessSelect',
                'values' : [{'actual': 'none', displayed: 'None'},
                            {'actual': 'childless', displayed: 'Childless'},
                            {'actual': 'infertile', displayed: 'Infertile'}],
                'type' : 'select',
                'tab': 'Personal',
                'function' : 'setChildlessStatus'
            },
            {
                'name' : 'childlessText',
                'type' : 'text',
                'dependency' : 'childlessSelect != none',
                'tip' : 'Reason',
                'tab': 'Personal',
                'function' : 'setChildlessReason'
            },
            {
                'name' : 'adopted',
                'label' : 'Adopted status',
                'type' : 'radio',
                'tab': 'Personal',
                'columns': 3,
                'values' : [
                    { 'actual' : '',           'displayed' : 'Not adopted' },
                    { 'actual' : 'adoptedIn',  'displayed' : 'Adopted in' },
                    { 'actual' : 'adoptedOut', 'displayed' : 'Adopted out' }
                ],
                'default' : '',
                'function' : 'setAdopted'
            },
            {
                'name' : 'monozygotic',
                'label' : 'Monozygotic twin',
                'type' : 'checkbox',
                'tab': 'Personal',
                'function' : 'setMonozygotic'
            },
            {
                'name' : 'nocontact',
                'label' : 'Not in contact with proband',
                'type' : 'checkbox',
                'tab': 'Personal',
                'function' : 'setLostContact'
            },
            {
                'name' : 'placeholder',
                'label' : 'Placeholder node',
                'type' : 'checkbox',
                'tab': 'Personal',
                'function' : 'makePlaceholder'
            },
            {
                'name' : 'commentsClinical',
                'label' : 'Comments',
                'type' : 'textarea',
                'tab': 'Clinical',
                'rows' : 4,
                'function' : 'setComments'
            },
            {
                'name' : 'commentsPersonal',
                'label' : 'Comments',
                'type' : 'textarea',
                'tab': 'Personal',
                'rows' : 2,
                'function' : 'setComments'
            },
            {
                'name' : 'evaluated',
                'label' : 'Documented evaluation',
                'type' : 'checkbox',
                'tab': 'Clinical',
                'function' : 'setEvaluated'
            },
            {   'name' : 'cancers',
                'label' : 'Common Cancers',
                'type' : 'cancerlist',
                'tab' : 'Cancers',
                'function' : 'setCancers'
            },
            {
                'name' : 'commentsCancers',
                'label' : 'Comments',
                'type' : 'textarea',
                'tab': 'Cancers',
                'rows' : 2,
                'function' : 'setComments'
            }
        ];

        fieldList = NodeMenuFields.extendPersonNodeFieldList(fieldList, disabledFields); // allow extensions to extend the list of fields

        return NodeMenuFields._filterDisabled(fieldList, disabledFields);
    },

    NodeMenuFields.getGroupNodeMenuFields = function(disabledFields) {
        var fieldList = [
            {
                'name' : 'identifier',
                'label' : '',
                'type'  : 'hidden',
                'tab': 'Personal'
            },
            {
                'name' : 'gender',
                'label' : 'Gender',
                'type' : 'radio',
                'columns': 3,
                'values' : [
                    { 'actual' : 'M', 'displayed' : 'Male' },
                    { 'actual' : 'F', 'displayed' : 'Female' },
                    { 'actual' : 'O', 'displayed' : 'Other' },
                    { 'actual' : 'U', 'displayed' : 'Unknown' }
                ],
                'default' : 'U',
                'tab': 'Personal',
                'function' : 'setGender'
            },
            {
                'name' : 'numInGroup',
                'label': 'Number of persons in this group',
                'type' : 'select',
                'values' : [{'actual': 1, displayed: 'N'}, {'actual': 2, displayed: '2'}, {'actual': 3, displayed: '3'},
                            {'actual': 4, displayed: '4'}, {'actual': 5, displayed: '5'}, {'actual': 6, displayed: '6'},
                            {'actual': 7, displayed: '7'}, {'actual': 8, displayed: '8'}, {'actual': 9, displayed: '9'}],
                'tab': 'Personal',
                'function' : 'setNumPersons'
            },
            {
                'name' : 'external_ids',
                'label': 'External ID(s)',
                'type' : 'text',
                'tab': 'Personal',
                'function' : 'setExternalID'
            },
            {
                'name' : 'ethnicity',
                'label' : 'Ethnicities<br>(common to all individuals in the group)',
                'type' : 'ethnicity-picker',
                'tab': 'Personal',
                'function' : 'setEthnicities'
            },
            {
                'name' : 'disorders',
                'label' : 'Known disorders<br>(common to all individuals in the group)',
                'type' : 'disease-picker',
                'tab': 'Clinical',
                'function' : 'setDisorders'
            },
            {
                'name' : 'comments',
                'label' : 'Comments',
                'type' : 'textarea',
                'rows' : 4,
                'tab': 'Clinical',
                'function' : 'setComments'
            },
            {
                'name' : 'state',
                'label' : 'All individuals in the group are',
                'type' : 'radio',
                'values' : [
                    { 'actual' : 'alive', 'displayed' : 'Alive' },
                    { 'actual' : 'aborted', 'displayed' : 'Aborted electively' },
                    { 'actual' : 'deceased', 'displayed' : 'Deceased' },
                    { 'actual' : 'miscarriage', 'displayed' : 'Miscarried' }
                ],
                'default' : 'alive',
                'tab': 'Personal',
                'function' : 'setLifeStatus'
            },
            {
                'name' : 'evaluatedGrp',
                'label' : 'Documented evaluation',
                'type' : 'checkbox',
                'tab': 'Clinical',
                'function' : 'setEvaluated'
            },
            {
                'name' : 'adopted',
                'label' : 'Adopted status',
                'type' : 'radio',
                'tab': 'Personal',
                'columns': 3,
                'values' : [
                    { 'actual' : '',           'displayed' : 'Not adopted' },
                    { 'actual' : 'adoptedIn',  'displayed' : 'Adopted in' },
                    { 'actual' : 'adoptedOut', 'displayed' : 'Adopted out' }
                ],
                'default' : '',
                'tab': 'Personal',
                'function' : 'setAdopted'
            }
        ];

        fieldList = NodeMenuFields.extendGroupNodeFieldList(fieldList, disabledFields); // allow extensions to extend the list of fields

        return NodeMenuFields._filterDisabled(fieldList, disabledFields);
    },

    NodeMenuFields.getRelationshipMenuFields = function(disabledFields) {
        var fieldList = [
            {
                'label' : 'Heredity options',
                'name' : 'childlessSelect',
                'values' : [{'actual': 'none', displayed: 'None'},{'actual': 'childless', displayed: 'Childless'},{'actual': 'infertile', displayed: 'Infertile'}],
                'type' : 'select',
                'function' : 'setChildlessStatus'
            },
            {
                'name' : 'childlessText',
                'type' : 'text',
                'dependency' : 'childlessSelect != none',
                'tip' : 'Reason',
                'function' : 'setChildlessReason'
            },
            {
                'name' : 'consangr',
                'label' : 'Consanguinity of this relationship',
                'type' : 'radio',
                'values' : [
                    { 'actual' : 'A', 'displayed' : 'Automatic' },
                    { 'actual' : 'Y', 'displayed' : 'Yes' },
                    { 'actual' : 'N', 'displayed' : 'No' }
                ],
                'default' : 'A',
                'function' : 'setConsanguinity'
            },
            {
                'name' : 'broken',
                'label' : 'Separated',
                'type' : 'checkbox',
                'function' : 'setBrokenStatus'
            }
        ];

        fieldList = NodeMenuFields.extendRelationshipFieldList(fieldList, disabledFields); // allow extensions to extend the list of fields

        return NodeMenuFields._filterDisabled(fieldList, disabledFields);
    },

    NodeMenuFields._filterDisabled = function(fieldList, disabledFields) {
        function isDisabled(field) {
            if (Helpers.arrayContains(disabledFields, field.name)) {
                return false;
            }
            return true;
        }
        return fieldList.filter(isDisabled); // remove disabled fields
    }

    return NodeMenuFields;
});
