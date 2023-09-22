skaffold run

kubectl port-forward service/grafana-service 3000:3000

kubectl port-forward service/prometheus-service 9090:9090

Deploy Prometheus as close to targets as possible.
So within the Kubernetes cluster.

install helm using powershel with elevated rights

choco install kubernetes-helm
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack

helm show values prometheus-community/kube-prometheus-stack > values.yaml

helm upgrade prometheus prometheus-community/kube-prometheus-stack -f values.yaml

kubectl get crd

kubectl get prometheuses.monitoring.coreos.com -o yaml
scrapeConfigSelector:
matchLabels:
release: prometheus

kubectl delete pod --all

helm list

helm uninstall prometheus
