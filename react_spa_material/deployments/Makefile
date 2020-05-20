gethelm:
	curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash

configurekube: 
	gcloud container clusters get-credentials cluster-1 --zone us-central1-c --project sound-helper-249805

couchbaseoperator: 
	helm status couchbase-operator-1

couchbase-update:
	helm upgrade couchbase-operator-1 -f values.yml couchbase/couchbase-operator
	
couchbase-ui:
	kubectl port-forward --namespace default couchbase-operator-1-couchse-cluster-0000 8091:8091
# NOTES:
# == Couchbase-operator deployed.
#    # Check the couchbase-operator logs
#    kubectl logs -f deployment/couchbase-operator-1-couchbase-operator  --namespace default


# == Admission-controller deployed.
#    # Check the admission-controller logs
#    kubectl logs -f deployment/couchbase-operator-1-couchbase-admission-controller --namespace default

# == Connect to Admin console
#    kubectl port-forward --namespace default couchbase-operator-1-couchbase-cluster-0000 8091:8091

#    # open http://localhost:8091
#    username: Administrator
#    password: Slp2SHhl

# == Manage this chart
#    # Upgrade Couchbase
#    helm upgrade couchbase-operator-1 -f <values.yaml> stable/couchbase

#    # Show this status again
#    helm status couchbase-operator-1