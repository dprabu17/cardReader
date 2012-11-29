require 'rho/rhocontroller'
require 'helpers/browser_helper'

class DataController < Rho::RhoController
  include BrowserHelper

  # GET /Data
  def index
    puts "index==================================="
    p @params
    CardReader.open
    CardReader.pinEntry  = "ON"
    CardReader.pinTimeout = "65535"
    CardReader.readEvent = url_for(:action => :cardreader_event_callback)
    @name = @params["name"] if @params["name"]!="" 
    @number = @params["number"] if @params["number"]!=""
  end
  
  def cardreader_event_callback
    puts "SSSSS=====cardreader_event_callback======================="
    p @params
    card_reader = @params["data"]
    caret_present = card_reader.include?("^")
    p caret_present
    if caret_present 
    card_data = card_reader.split("^")
    card_user_name = formatName(card_data[1].gsub(/\n/, ''))
    
    p "card user name: #{card_user_name}"
    card_number = card_data[0]
    
   c = card_number.replace(card_number.gsub(/[^0-9]/, ''))
    p "Card Number : #{c}"
    
    card_expiry = card_data[2].slice(2, 2) + "/" + card_data[2].slice(0, 2)
    p "Card Expiry: #{card_expiry}"
    message = "card user name: #{card_user_name}" + "\n" +  "Card Number : #{c}" + "\n" + "Card Expiry: #{card_expiry}" + "\n"
    end
    puts message
    puts "********************"
    Alert.show_popup( {
    # :message => @params["mode"] +"\n"+ @params["data"], 
      :message => message, 
     :title => 'Notice:  CardReader',
     :buttons => ["Ok"]
      } )
    #CardReader.close
    WebView.navigate("/app/Data/index?name=#{card_user_name}&number=#{c}")
  end
  # GET /Data/{1}
  def show
    @data = Data.find(@params['id'])
    if @data
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /Data/new
  def new
    @data = Data.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /Data/{1}/edit
  def edit
    @data = Data.find(@params['id'])
    if @data
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /Data/create
  def create
    @data = Data.create(@params['data'])
    redirect :action => :index
  end

  # POST /Data/{1}/update
  def update
    @data = Data.find(@params['id'])
    @data.update_attributes(@params['data']) if @data
    redirect :action => :index
  end

  # POST /Data/{1}/delete
  def delete
    @data = Data.find(@params['id'])
    @data.destroy if @data
    redirect :action => :index  
  end
  
  def formatName(name)
    result = ""
    name_split = []
    if (name.include?("/"))
      name_split = name.split('/');
      if name_split[1].nil?
          result = name_split[0]
      else
          result = name_split[1] + " " + name_split[0]
      end
    else
      result = name;
    end  
    return result;
  end
end
