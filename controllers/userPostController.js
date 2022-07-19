const { v4: uuidv4 } = require('uuid');
const formidable = require('formidable');
const fs = require('fs');
const Post = require('../models/Post');

module.exports.createPost = (req, res) => {
    const form = formidable({
        multiples: true
    });
    form.parse(req, async (error, fields, files) => {
        // return res.json(fields);
        // return res.json(files);
        const errors = [];
        const { title, body, description, id, name, slug } = fields;
        if (title === '') {
            errors.push({
                msg: 'Title is required'
            })
        }
        if (body === '') {
            errors.push({
                msg: 'Body is required'
            })
        }
        if (description === '') {
            errors.push({
                msg: 'Description is required'
            })
        }
        if (slug === '') {
            errors.push({
                msg: 'Slug is required'
            })
        }
        if (Object.keys(files).length === 0) {
            errors.push({
                msg: 'Image is required',
            })
        } else {
            const { mimetype } = files.image;
            // console.log(mimetype);
            const split_Image = mimetype.split('/');
            // console.log(split_Image[1]);
            const extension = split_Image[1].toLowerCase();
            if (extension !== 'png' && extension !== 'jpg' && extension !== 'jpeg') {
                errors.push({
                    msg: `${extension} is not a valid extension`,
                })
            } else {
                files.image.originalFilename = uuidv4() + '-' + extension;
            }
        }

        const checkSlug = await Post.findOne({ slug });
        if (checkSlug) {
            errors.push({
                msg: 'Please choose a unique slug/URL'
            })
        }

        if (errors.length !== 0) {
            return res.status(400).json({
                errors,
                files
            })
        } else {
            const newPath = __dirname + `../../the-anecdote-client/public/image/${files.image.originalFilename}`;
            fs.copyFile(files.image.filepath, newPath, async (error) => {
                try {
                    const response = await Post.create({
                        title,
                        body,
                        image: files.image.originalFilename,
                        description,
                        slug,
                        userName: name,
                        userId: id
                    });
                    return res.status(200).json({
                        msg: 'Post created successfully',
                        response
                    })
                    console.log('Image Successfully Uploaded.');
                } catch (error) {
                    return res.status(500).json({
                        errors: error,
                        msg: error.message
                    })
                }
            })
        }
    })
}

// Show created post

module.exports.fetchPosts = async (req, res) => {
    const id = req.params.id;
    const page = req.params.page;
    const perPage = 4;
    const skip = (page - 1) / perPage;
    try {
        const count = await Post.find({ userId: id }).countDocuments();
        const response = await Post.find({ userId: id })
            .skip(skip)
            .limit(perPage)
            .sort({ updatedAt: -1 });
        return res.status(200).json({
            response
        })
    } catch (error) {
        return res.status(500).json({
            errors: error,
            msg: error.message
        });
    }
}