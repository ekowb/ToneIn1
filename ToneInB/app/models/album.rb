class Album < ApplicationRecord
    require 'cmath' 

    def self.set_colors
        self.all[2001..2400].each do |a|
            a.color = a.find_main_color
            a.update_attribute(:color, a.find_main_color)

        end
    end


    def find_main_color
        top_colors = Miro::DominantColors.new(self.image_url)
        main_color = top_colors.to_hex.first
        # return main_color
    end

    def self.find_rgb
        self.all.each do |a|
            top_colors = Miro::DominantColors.new(a.image_url)
            sum_rgb = 0
            top_colors.to_rgb.first.each do |c|
                sum_rgb += c
            end
            if (sum_rgb < 60)
                main_rgb = top_colors.to_rgb.second
            else
                main_rgb = top_colors.to_rgb.first
            end
            a.rgb = main_rgb
            a.update_attribute(:rgb, main_rgb)
        end
    end


    def self.read_colors
        # hash_array = []
        # File.open("satfaces.txt").each do |line|
        #     color_hash = Hash.new
        #     color_hash[:name] = line.match(/[a-zA-Z]+/).to_s
        #     color_hash[:rgb] = line.match(/\d+\,\s\d+\,\s\d+/).to_s.split(", ")
        #     color_hash[:rgb].map!(&:to_i)
        #     hash_array << color_hash
        # end

        category_hash = [{:name =>"red", :rgb => [255,0,0]}, 
                            {:name => "orange", :rgb => [255,128,0]},
                            {:name => "gold", :rgb => [255,215,0]},
                            {:name => "yellow", :rgb => [255, 255, 0]},
                            {:name => "lime", :rgb => [0, 255, 0]},
                            {:name => "green", :rgb => [0,128,0]},
                            {:name => "cyan", :rgb => [0,255,255]},
                            {:name => "teal", :rgb => [0,128,128]},
                            {:name => "blue", :rgb => [0,0,255]},
                            {:name => "navy", :rgb => [0,0,128]},
                            {:name => "purple", :rgb => [128,0,128]},
                            {:name => "magenta", :rgb => [255,0,255]},
                            {:name => "pink", :rgb => [255, 153, 204]},
                            {:name => "salmon", :rgb => [250, 128, 114]},
                            {:name => "lavender", :rgb => [230, 230, 250]},
                            {:name => "brown",:rgb => [139,69,19]},
                            {:name => "white", :rgb => [255,255,255]},
                            {:name => "gray", :rgb => [128,128,128]},
                            {:name => "peachpuff", :rgb => [255,218,185]},
                            {:name => "silver", :rgb => [192,192,192]},
                            {:name => "black", :rgb => [0,0,0]}]

            self.all.each do |a|

            # the rgb of each album equals the found rgb
            # for the color catgeory find the rgb that matches the album's rgb in the hash
            # pencil = hash_array.find do |h|
            #     "#{h[:rgb]}" == a.rgb
            # # and return its name
            # end

                    rgb_trip = JSON.parse(a.rgb)

                    closest_category = ""
                    least_distance = 441.673

                    category_hash.each do |category|
                        num = CMath.sqrt( (((rgb_trip[0] - category[:rgb][0]).abs) ** 2) + (((rgb_trip[1] - category[:rgb][1]).abs) ** 2) + (((rgb_trip[2] - category[:rgb][2]).abs) ** 2))
                         #perc = num/441.673 * 100
                        if num < least_distance
                            least_distance = num
                            closest_category = category[:name]    
                        end
                        
                        
                    end
                    a.color_category = closest_category
                    a.save

            end
        end
end

