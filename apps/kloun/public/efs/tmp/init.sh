#!/bin/bash

# Retrieve the public IP address of the EC2 instance
public_ip=$(curl http://169.254.169.254/latest/meta-data/public-ipv4)
pm2 ls | awk '{print $4}' | grep -v 'git' | xargs -I{} pm2 delete {}
pm2 restart git
pm2 delete kloun
pm2 delete eziktok
# del volumes
# Update the A record in Route 53 userz.net
aws route53 change-resource-record-sets --hosted-zone-id Z10023321G9JHD7I8U9JP \
--change-batch '{"Changes":[{"Action":"UPSERT","ResourceRecordSet":{"Name":"userz.net","Type":"A","TTL":300,"ResourceRecords":[{"Value":"'${public_ip}'"}]}}]}'  --no-cli-pager

# Update the A record in Route 53 kloun.lol
aws route53 change-resource-record-sets --hosted-zone-id Z1004927112S567CAOGF6 \
--change-batch '{"Changes":[{"Action":"UPSERT","ResourceRecordSet":{"Name":"kloun.lol","Type":"A","TTL":300,"ResourceRecords":[{"Value":"'${public_ip}'"}]}}]}'  --no-cli-pager
aws route53 change-resource-record-sets --hosted-zone-id Z1004927112S567CAOGF6 \
--change-batch '{"Changes":[{"Action":"UPSERT","ResourceRecordSet":{"Name":"www.kloun.lol","Type":"A","TTL":300,"ResourceRecords":[{"Value":"'${public_ip}'"}]}}]}'  --no-cli-pager
aws route53 change-resource-record-sets --hosted-zone-id Z1004927112S567CAOGF6 \
--change-batch '{"Changes":[{"Action":"UPSERT","ResourceRecordSet":{"Name":"db.kloun.lol","Type":"A","TTL":300,"ResourceRecords":[{"Value":"'${public_ip}'"}]}}]}'  --no-cli-pager
aws route53 change-resource-record-sets --hosted-zone-id Z1004927112S567CAOGF6 \
--change-batch '{"Changes":[{"Action":"UPSERT","ResourceRecordSet":{"Name":"hasura.kloun.lol","Type":"A","TTL":300,"ResourceRecords":[{"Value":"'${public_ip}'"}]}}]}'  --no-cli-pager

aws route53 change-resource-record-sets --hosted-zone-id Z1004927112S567CAOGF6 \
--change-batch '{"Changes":[{"Action":"UPSERT","ResourceRecordSet":{"Name":"git.kloun.lol","Type":"A","TTL":300,"ResourceRecords":[{"Value":"'${public_ip}'"}]}}]}'  --no-cli-pager

# Wait for the changes to propagate
sleep 15

aws ec2 describe-volumes --filters Name=status,Values=available --query 'Volumes[*].{ID:VolumeId}' --output text | xargs -L 1 aws ec2 delete-volume --volume-id
sudo apt update 
sudo apt upgrade -y
sudo npm upgrade -g
