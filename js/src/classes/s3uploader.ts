import AWS, { S3 } from 'aws-sdk'

export class S3Uploader {
  s3: S3

  constructor() {
    AWS.config.update({ region: process.env.AWS_S3_REGION })
    this.s3 = new S3()

    console.log('initializing s3 uploader...', process.env.AWS_S3_REGION)

    this.s3.listBuckets((err, data) => {
      console.log('listing buckets...')
      if (err) throw new Error("Can't list buckets for whatever reason")

      console.log('AWS BUCKETS =>', data.Buckets)
    })
  }
}
