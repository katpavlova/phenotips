/*
 * See the NOTICE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see http://www.gnu.org/licenses/
 */
package org.phenotips.studies.family;

import org.phenotips.studies.family.internal.StatusResponse;
import org.phenotips.studies.family.internal2.StatusResponse2;

import org.xwiki.component.annotation.Role;
import org.xwiki.query.QueryException;

import java.util.List;

import javax.naming.NamingException;

import com.xpn.xwiki.XWiki;
import com.xpn.xwiki.XWikiContext;
import com.xpn.xwiki.XWikiException;
import com.xpn.xwiki.doc.XWikiDocument;

import net.sf.json.JSONObject;

/**
 * Provides a single method as entry point to main logic and processing.
 *
 * @version $Id$
 * @since 1.2RC1
 */
@Role
public interface Processing
{
    /** The name under which the linked patient id resides under in the JSON generated by the pedigree. */
    String PATIENT_LINK_JSON_KEY = "phenotipsId";

    /**
     * Performs several operations on the passed in data, and eventually saves it into appropriate documents.
     *
     * @param anchorId could be a family id or a patient id. If a patient does not belong to a family, there is no
     *            processing of the pedigree, and the pedigree is simply saved to that patient record. If the patient
     *            does belong to a family, or a family id is passed in as the `anchorId`, there is processing of the
     *            pedigree, which is then saved to all patient records that belong to the family and the family document
     *            itself.
     * @param json (data) part of the pedigree JSON
     * @param image svg part of the pedigree JSON
     * @return {@link StatusResponse} with one of many possible statuses
     * @throws XWikiException one of many possible reasons for XWiki to fail
     * @throws NamingException could happen during document creation
     * @throws QueryException could happen when looking for a patient
     */
    StatusResponse2 processPatientPedigree(String anchorId, JSONObject json, String image)
        throws XWikiException, NamingException, QueryException;

    /**
     * TODO.
     *
     * @param familyDocument XWiki family document object.
     * @param patientIds List of PhenoTips patient IDs of patients in the family.
     * @throws XWikiException TODO: review if need to throw.
     */
    void setUnionOfUserPermissions(XWikiDocument familyDocument, List<String> patientIds) throws
        XWikiException;

    /**
     * Removes a patient from the family, modifying the both the family and patient records to reflect the change.
     *
     * @param id of the patient to delete
     * @param wiki for getting documents
     * @param context for saving documents
     * @throws XWikiException while retrieving or saving a document
     */
    void removeMember(String id, XWiki wiki, XWikiContext context) throws XWikiException;

    /**
     * Removes a patient from the family, modifying the both the family and patient records to reflect the change.
     *
     * @param id of the patient to delete
     * @throws XWikiException while retrieving or saving a document
     */
    void removeMember(String id);
}
