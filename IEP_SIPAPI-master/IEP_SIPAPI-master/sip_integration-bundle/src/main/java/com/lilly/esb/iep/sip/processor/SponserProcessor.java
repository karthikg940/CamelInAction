/**
 * Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
 */
package com.lilly.esb.iep.sip.processor;

import java.io.StringReader;
import java.nio.charset.StandardCharsets;
import java.util.GregorianCalendar;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;

import com.lilly.esb.iep.sip.constants.Constants;
import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.Processor;
import org.cdisc.ns.odm.v1.ODM;
import org.cdisc.ns.odm.v1.ODMcomplexTypeDefinitionAddress;
import org.cdisc.ns.odm.v1.ODMcomplexTypeDefinitionAdminData;
import org.cdisc.ns.odm.v1.ODMcomplexTypeDefinitionCity;
import org.cdisc.ns.odm.v1.ODMcomplexTypeDefinitionCountry;
import org.cdisc.ns.odm.v1.ODMcomplexTypeDefinitionEmail;
import org.cdisc.ns.odm.v1.ODMcomplexTypeDefinitionFax;
import org.cdisc.ns.odm.v1.ODMcomplexTypeDefinitionFirstName;
import org.cdisc.ns.odm.v1.ODMcomplexTypeDefinitionLastName;
import org.cdisc.ns.odm.v1.ODMcomplexTypeDefinitionPhone;
import org.cdisc.ns.odm.v1.ODMcomplexTypeDefinitionPostalCode;
import org.cdisc.ns.odm.v1.ODMcomplexTypeDefinitionStateProv;
import org.cdisc.ns.odm.v1.ODMcomplexTypeDefinitionStreetName;
import org.cdisc.ns.odm.v1.ODMcomplexTypeDefinitionUser;
import org.cdisc.ns.odm.v1.SIPcomplexTypeElementDefinitionDef;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.xml.sax.SAXException;

import com.microsoft.schemas.ado._2007._08.dataservices.SponsorDetails;
import com.sharedinvestigator.sip.schema.RoleDef;
import com.sharedinvestigator.sip.schema.SIPResponseDef;
import com.sharedinvestigator.sip.schema.SIPcomplexTypeDefinitionUserProfileDef;
import com.sharedinvestigator.sip.schema.UserRoleDef;



/**
 * Created by Shravan Vanaparthi on 5/17/2017.
 */
public class SponserProcessor implements Processor {

    private final static Logger LOGGER = LoggerFactory.getLogger(SponserProcessor.class);
    private DatatypeFactory dataTypeFactory;

    private Marshaller sipSponsorUserMarshaller;
    private Unmarshaller sipSponsorUserUnmarshaller;



    public SponserProcessor() throws SAXException, JAXBException {
    }


    @Override
    public void process(Exchange exchange) throws Exception {

        String sponsorType = (String) exchange.getIn().getHeader("SponsorType");
        if(null == sponsorType){
            sponsorType = (String) exchange.getOut().getHeader("SponsorType");
        }

        if(null != sponsorType && "GET".equalsIgnoreCase(sponsorType)){
            Message outMsg = exchange.getOut();
            Object payLoad = exchange.getProperty("PayLoad");
            ODM odm = exchange.getIn().getBody(ODM.class);
            if(null != odm){
                List<SIPcomplexTypeElementDefinitionDef> definitionDefList =  odm
                        .getODMElementExtension();
                if(null!= definitionDefList && definitionDefList.size()>0){
                    SIPcomplexTypeElementDefinitionDef definitionDef = definitionDefList.get(0);
                    if(null != definitionDef && null != definitionDef.getSIPResponse()){
                        List<SIPResponseDef> responseList =  definitionDef.getSIPResponse();
                        SIPResponseDef responseDef = responseList.get(0);
                        exchange.getOut().setHeader("getSponsorStatus", responseDef.getStatus());
                    }
                }else {
                    List<ODMcomplexTypeDefinitionAdminData> adminDataList = odm.getAdminData();
                    if(null != adminDataList && adminDataList.size()>0){
                        ODMcomplexTypeDefinitionAdminData adminData = adminDataList.get(0);
                        if(null != adminData && null != adminData.getUser()){
                               List<ODMcomplexTypeDefinitionUser> userList = adminData.getUser();
                               if(null != userList && userList.size()>0){
                                   ODMcomplexTypeDefinitionUser user = userList.get(0);
                                   if(null != user && null != user.getUserElementExtension()){
                                       SIPcomplexTypeDefinitionUserProfileDef userProfileDef =
                                               user.getUserElementExtension().get(0);
                                       XMLGregorianCalendar activationDate = userProfileDef.getActivationStartDate();
                                       exchange.setProperty("activation_date", userProfileDef.getActivationStartDate());
                                   }
                               }
                        }
                    }
                }
            }
            outMsg.setBody(payLoad);
        }else if(null != sponsorType && (("CREATE".equalsIgnoreCase(sponsorType))||("UPDATE".equalsIgnoreCase(sponsorType)))){
            SponsorDetails sponsorSharePointBean = exchange.getIn().getBody(SponsorDetails.class);
            ODMcomplexTypeDefinitionUser user = new ODMcomplexTypeDefinitionUser();
            ODMcomplexTypeDefinitionFirstName firstName = new ODMcomplexTypeDefinitionFirstName();
            ODMcomplexTypeDefinitionLastName lastName = new ODMcomplexTypeDefinitionLastName();
            ODMcomplexTypeDefinitionAddress address = new ODMcomplexTypeDefinitionAddress();
            ODMcomplexTypeDefinitionEmail email = new ODMcomplexTypeDefinitionEmail();
            ODMcomplexTypeDefinitionFax fax = new ODMcomplexTypeDefinitionFax();
            ODMcomplexTypeDefinitionPhone phone = new ODMcomplexTypeDefinitionPhone();
            SIPcomplexTypeDefinitionUserProfileDef userElementExtension = new SIPcomplexTypeDefinitionUserProfileDef();

            firstName.setValue(sponsorSharePointBean.getFirstName());
            lastName.setValue(sponsorSharePointBean.getLastName());
            address = createAddress(address, sponsorSharePointBean);
            email.setValue(sponsorSharePointBean.getEmail());

            phone.setValue("" + sponsorSharePointBean.getPhone());
            userElementExtension = createUserElementExtension(userElementExtension, sponsorSharePointBean,
                    sponsorType, (XMLGregorianCalendar)exchange.getProperty("activation_date"));
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.getAddress().add(address);
            user.getEmail().add(email);
            if("CREATE".equalsIgnoreCase(sponsorType)){
                fax.setValue("FAX");
                user.getFax().add(fax);
            }else if("UPDATE".equalsIgnoreCase(sponsorType)){
                exchange.setProperty(Constants.TRAIL_ALIAS, sponsorSharePointBean.getTrialAlias());
                exchange.setProperty(Constants.SITE_REF, sponsorSharePointBean.getSiteReferenceNumber());
                exchange.setProperty(Constants.ROLE_NAME, sponsorSharePointBean.getSIPRoleNameValue());
                exchange.setProperty(Constants.LILLY_GLOBAL_ID, sponsorSharePointBean.getLillyGlobalID().toString());
            }
            user.getPhone().add(phone);
            user.getUserElementExtension().add(userElementExtension);
            ODM odm = new ODM();
            ODMcomplexTypeDefinitionAdminData adminData = new ODMcomplexTypeDefinitionAdminData();
            adminData.getUser().add(user);
            odm.getAdminData().add(adminData);
            exchange.getOut().setBody(odm);
        }else if(null != sponsorType && ("UPDATE_ASSOCIATIONS".equalsIgnoreCase(sponsorType))){
            String studyID = (String) exchange.getProperty(Constants.TRAIL_ALIAS);
            String siteRef = (String) exchange.getProperty(Constants.SITE_REF);
            String roleName = (String) exchange.getProperty(Constants.ROLE_NAME);
            String lillyGlobalId = (String) exchange.getProperty(Constants.LILLY_GLOBAL_ID);
            ODMcomplexTypeDefinitionUser user = new ODMcomplexTypeDefinitionUser();
            SIPcomplexTypeDefinitionUserProfileDef userElementExtension = new SIPcomplexTypeDefinitionUserProfileDef();
            userElementExtension.setTCBUID(lillyGlobalId);
            UserRoleDef userRoleDef = new UserRoleDef();
            RoleDef roleDef = new RoleDef();
            if(null!=roleName && !"".equalsIgnoreCase(roleName)){
                if(null!=studyID && !"".equalsIgnoreCase(studyID)){
                    if(null!=siteRef && !"".equalsIgnoreCase(siteRef)){
                        userRoleDef.setSiteId(siteRef);
                    }
                    userRoleDef.setStudyId(studyID);
                }
                roleDef.setRoleName(roleName);
                userRoleDef.setRoleDetails(roleDef);
            }else{
                if(null!=studyID && !"".equalsIgnoreCase(studyID)){
                    if(null!=siteRef && !"".equalsIgnoreCase(siteRef)){
                        userRoleDef.setSiteId(siteRef);
                        roleDef.setRoleName("Monitor Not needed");
                    }else{
                        roleDef.setRoleName("Study _Not needed");
                    }
                    userRoleDef.setStudyId(studyID);
                    userRoleDef.setRoleDetails(roleDef);
                }
            }

            userElementExtension.getUserRoleMap().add(userRoleDef);
            user.getUserElementExtension().add(userElementExtension);
            ODM odm = new ODM();
            ODMcomplexTypeDefinitionAdminData adminData = new ODMcomplexTypeDefinitionAdminData();
            adminData.getUser().add(user);
            odm.getAdminData().add(adminData);
            exchange.getOut().setBody(odm);
        }
    }

    private SIPcomplexTypeDefinitionUserProfileDef createUserElementExtension(SIPcomplexTypeDefinitionUserProfileDef userElementExtension,
                                                                              SponsorDetails sponsorSharePointBean, String sponsorType,
                                                                              XMLGregorianCalendar activationDate) throws DatatypeConfigurationException {

        userElementExtension.setTCBUID("" + sponsorSharePointBean.getLillyGlobalID());
        userElementExtension.setNamePrefix("" + sponsorSharePointBean.getNamePrefix());
        userElementExtension.setMiddleName("" + sponsorSharePointBean.getMiddleName());
        userElementExtension.setNameSuffix("" + sponsorSharePointBean.getNameSuffix());
        if(null!=sponsorType && "CREATE".equalsIgnoreCase(sponsorType)){
            this.dataTypeFactory = DatatypeFactory.newInstance();
            userElementExtension.setActivationStartDate(this.dataTypeFactory
                    .newXMLGregorianCalendar(new GregorianCalendar()));
        }else if(null !=sponsorType && "UPDATE".equalsIgnoreCase(sponsorType)){
            userElementExtension.setActivationStartDate(activationDate);
        }
        UserRoleDef userRoleDef = new UserRoleDef();
        RoleDef roleDef = new RoleDef();
        roleDef.setRoleName(sponsorSharePointBean.getSIPRoleNameValue());
        userRoleDef.setRoleDetails(roleDef);
        if(null!=sponsorSharePointBean.getTrialAlias() && !"".equalsIgnoreCase(sponsorSharePointBean.getTrialAlias())){
            userRoleDef.setStudyId(sponsorSharePointBean.getTrialAlias());
        }
        if(null!=sponsorSharePointBean.getSiteReferenceNumber()&& !"".equalsIgnoreCase(sponsorSharePointBean.getSiteReferenceNumber())){
            userRoleDef.setSiteId(sponsorSharePointBean.getSiteReferenceNumber());
        }
        userElementExtension.getUserRoleMap().add(userRoleDef);
        userElementExtension.setTimeZone(sponsorSharePointBean.getTimezoneValue());
        return userElementExtension;
    }

    private ODMcomplexTypeDefinitionAddress createAddress(ODMcomplexTypeDefinitionAddress address,
    		SponsorDetails sponsorSharePointBean) {


        ODMcomplexTypeDefinitionCity city = new ODMcomplexTypeDefinitionCity();
        ODMcomplexTypeDefinitionStateProv stateProv = new ODMcomplexTypeDefinitionStateProv();
        ODMcomplexTypeDefinitionCountry country = new ODMcomplexTypeDefinitionCountry();
        ODMcomplexTypeDefinitionPostalCode postalCode = new ODMcomplexTypeDefinitionPostalCode();
        ODMcomplexTypeDefinitionStreetName addressLine1 = new ODMcomplexTypeDefinitionStreetName();
        ODMcomplexTypeDefinitionStreetName addressLine2 = new ODMcomplexTypeDefinitionStreetName();

        city.setValue(sponsorSharePointBean.getCity());
        stateProv.setValue(sponsorSharePointBean.getState());
        country.setValue(sponsorSharePointBean.getCountry());
        postalCode.setValue(sponsorSharePointBean.getPostalcode());
        addressLine1.setValue(sponsorSharePointBean.getAddress1());
        addressLine2.setValue(sponsorSharePointBean.getAddress2());

        address.setCity(city);
        address.setCountry(country);
        address.setPostalCode(postalCode);
        address.setStateProv(stateProv);
        address.getStreetName().add(addressLine1);
        address.getStreetName().add(addressLine2);

        return address;
    }
}
