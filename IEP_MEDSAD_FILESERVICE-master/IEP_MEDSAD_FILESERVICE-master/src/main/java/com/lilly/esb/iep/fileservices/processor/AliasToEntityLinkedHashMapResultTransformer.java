package com.lilly.esb.iep.fileservices.processor;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;

import org.hibernate.transform.BasicTransformerAdapter;

/**
 * 	
 *	Custom Implementation of AliasToEntityMapResultTransformer to handle
 *	the column ordering issue in the SQL ResultSet, the only change made 
 *	is from Map to LinkedHashMap 
 *
 */
public class AliasToEntityLinkedHashMapResultTransformer extends BasicTransformerAdapter implements Serializable {

	public static final AliasToEntityLinkedHashMapResultTransformer INSTANCE = new AliasToEntityLinkedHashMapResultTransformer();

	/**
	 * Disallow instantiation of AliasToEntityMapResultTransformer.
	 */
	private AliasToEntityLinkedHashMapResultTransformer() {
	}

	/**
	 * {@inheritDoc}
	 */
	public Object transformTuple(Object[] tuple, String[] aliases) {
		Map result = new LinkedHashMap(tuple.length);
		for ( int i=0; i<tuple.length; i++ ) {
			String alias = aliases[i];
			if ( alias!=null ) {
				result.put( alias, tuple[i] );
			}
		}
		return result;
	}

	/**
	 * Serialization hook for ensuring singleton uniqueing.
	 *
	 * @return The singleton instance : {@link #INSTANCE}
	 */
	private Object readResolve() {
		return INSTANCE;
	}
}
