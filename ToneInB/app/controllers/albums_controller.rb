class AlbumsController < ApplicationController

    def show
        @album = Album.find(params[:id])
        render json: @album
    end

    def index
        @albums = Album.sort_by_color
        render json: @albums
    end

    private

   

end
