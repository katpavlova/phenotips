/*
 * See the NOTICE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */
package org.phenotips.studies.family;

import org.phenotips.studies.family.internal.StatusResponse;

import org.xwiki.component.annotation.Role;
import org.xwiki.query.QueryException;

import javax.naming.NamingException;

import com.xpn.xwiki.XWikiException;

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
    StatusResponse processPatientPedigree(String anchorId, JSONObject json, String image)
        throws XWikiException, NamingException, QueryException;
}